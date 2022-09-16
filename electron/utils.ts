import { SvgInfo, SvgInfoObj, newObj } from '../client/Types';
import * as cp from 'child_process';

const fetch: any = (...args: any) =>
  import('node-fetch').then(({ default: fetch }: any) => fetch(...args));

// utilized for start and end times when querying for metrics
export const setStartAndEndTime = () => {
  var now = new Date();
  var copyNow = new Date(now.getTime());
  copyNow.setHours(copyNow.getHours() - 1);
  var startTime = copyNow.toISOString();
  var endTime = new Date().toISOString();
  return {
    startTime: startTime,
    endTime: endTime,
  };
};

export const formatClusterData = (data: any): string[] => {
  const formattedData: string[] = data.body.items.map(
    (pod: any) => pod?.metadata?.name
  );
  return formattedData;
};

export const formatEvents = (data: any): {}[] => {
  const dataArr: string[] = data.split('\n');
  const trimmed: string[] = dataArr.map((el: any) => el.split(/[ ]{2,}/));
  const formattedEvents: {}[] = trimmed.map((event: any) => {
    return {
      namespace: event[0],
      lastSeen: event[1],
      severity: event[2],
      reason: event[3],
      message: event[4],
      object: event[5],
    };
  });
  return formattedEvents.slice(1, -1);
};

export const formatAlerts = (data: any): {}[] => {
  const formattedAlerts: object[] = [];
  data.data.groups.forEach((group: any) => {
    group.rules.forEach((rule: any) => {
      if (rule.state) {
        rule.labels.severity = capitalize(rule.labels.severity);
        rule.state = capitalize(rule.state);

        const alert: {} = {
          group: group.name,
          state: rule.state,
          name: rule.name,
          severity: rule.labels.severity,
          description: rule.annotations.description,
          summary: rule.annotations.summary,
          alerts: rule.alerts,
        };
        formattedAlerts.push(alert);
      }
    });
  });
  return formattedAlerts;
};

export function capitalize(data: string) {
  return data[0].toUpperCase() + data.slice(1);
}

export function parseMem(entry: string) {
  // if dealing with memory (ki, mb, mi, etc.)

  return parseInt(entry.slice(0, entry.length - 2));
}

export function parseNode(obj: any) {
  // for each node from query we spit back this object

  // using Type Assertion to create an empty object for the typed variable
  // this could potentially create inconsistencies.
  // const output: SvgInfo = {} as SvgInfo;

  // best practice might be to create a new class object with default values and set
  const output: SvgInfo = new SvgInfoObj();

  if (obj.status?.allocatable !== undefined) {
    const memUsage: number = parseMem(obj.status.allocatable.memory);
    output.usage = memUsage;
  }
  if (obj.status?.capacity !== undefined) {
    const memLimit: number = parseMem(obj.status.capacity.memory);
    output.limit = memLimit;
  }
  // (if node is truthy, and if node.metadata is truthy, and if node.metadat.name is truthy)
  if (obj?.metadata?.name) output.name = obj.metadata.name;
  return output;
}

export async function parsePod(obj: any) {
  const output: SvgInfo = new SvgInfoObj();

  // (if node is truthy, and if node.metadata is truthy, and if node.metadat.name is truthy)
  if (obj?.metadata?.name) output.name = obj.metadata.name;
  // (async (): Promise<any> => {
  const { startTime, endTime } = setStartAndEndTime();
  const podName = obj.metadata.name;

  // PromQL to query resource limits for pods in all namespaces
  try {
    const query1 = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_limits{pod="${podName}"}&start=${startTime}&end=${endTime}&step=24h`;
    const query2 = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_requests{pod="${podName}"}&start=${startTime}&end=${endTime}&step=24h`;
    const data1 = await fetch(query1);

    const jsonData1: any = await data1.json();

    const data2 = await fetch(query2);
    const jsonData2: any = await data2.json();

    if (jsonData1.data.result[0]) {
      output.limit = parseInt(jsonData1.data.result[0].values[0][1]);
      // console.log('OUTPUT LIMITS', output.limit)
    }

    if (jsonData2.data.result[0]) {
      output.request = parseInt(jsonData2.data.result[0].values[0][1]);
    }

    output.parent = obj.spec.nodeName;
    output.namespace = obj.metadata.namespace;

    return output;
  } catch (error) {
    return {
      name: 'string',
      usage: 1,
      request: 1,
      limit: 1,
      parent: 'strong',
      namespace: 'string',
    };
  }
}

export const formatOOMKills = (data: string[]) => {
  const OOMKills: {}[] = [];

  data.forEach((el: any) => {
    const podDesc = cp.execSync(`kubectl describe pod ${el}`).toString();
    const podData = podDesc.split('\n');
    const updatedPodData = podData.map(pod =>
      pod.replace(/^\s+|\s+$|\s+(?=\s)/g, '')
    );
    // console.log(updatedPodData);
    const indexOfTerm = updatedPodData.indexOf('Last State: Terminated');
    // console.log(indexOfTerm);
    const filteredPodData: string[] = updatedPodData.slice(
      indexOfTerm,
      indexOfTerm + 13
    );
    // console.log(filteredPodData);

    const newObj: { [index: string]: any } = {};

    const limitIdx: any = filteredPodData.indexOf('Limits:');
    const limitCpu = filteredPodData[limitIdx + 1];
    const limitMemory = filteredPodData[limitIdx + 2];
    const limits = {
      limitCpu,
      limitMemory,
    };

    const requestIdx = filteredPodData.indexOf('Requests:');
    const requestCpu = filteredPodData[requestIdx + 1];
    const requestMemory = filteredPodData[requestIdx + 2];
    const requests = {
      requestCpu,
      requestMemory,
    };

    newObj['Pod Name'] = el;
    newObj[filteredPodData[limitIdx]] = limits;
    newObj[filteredPodData[requestIdx]] = requests;

    filteredPodData.slice(0, 7).forEach((el: any) => {
      const colon: any = el.indexOf(':');
      // Extravts key from the left of colon
      const key: keyof newObj = el.slice(0, colon);
      // Extracts value from the right of colon and removes white space
      newObj[key] = el.slice(colon + 2);
    });

    OOMKills.push(newObj);
  });

  return OOMKills;
};
