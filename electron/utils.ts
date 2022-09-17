import { SvgInfo, SvgInfoObj, oomObject } from '../client/Types';
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
    const memRequest: number = parseMem(obj.status.allocatable.memory);
    output.request = memRequest;
  }
  if (obj.status?.capacity !== undefined) {
    const memLimit: number = parseMem(obj.status.capacity.memory);
    output.limit = memLimit;
  }

  // (if node is truthy, and if node.metadata is truthy, and if node.metadat.name is truthy)
  if (obj?.metadata?.name) output.name = obj.metadata.name;
  return output;
}

export async function fetchMem(obj: any) {
  const output: SvgInfo = new SvgInfoObj();
  const podName = obj.metadata.name;
  const { startTime, endTime } = setStartAndEndTime();

  if (obj?.metadata?.name) {
    output.name = obj.metadata.name;
    output.parent = obj.spec.nodeName;
    output.namespace = obj.metadata.namespace;
  }

  try {
    // PromQL to query resource limits for pods in all namespaces
    const limitsQuery = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_limits{pod="${podName}",resource="memory"}&start=${startTime}&end=${endTime}&step=24h`;
    const requestsQuery = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_requests{pod="${podName}",resource="memory"}&start=${startTime}&end=${endTime}&step=24h`;
    const limit = await fetch(limitsQuery);
    const request = await fetch(requestsQuery);
    const limitData: any = await limit.json();
    const requestData: any = await request.json();

    // console.log('THIS IS JSONDATA 1', limitData.data.result)
    if (limitData.data.result[0]) {
      if (limitData.data.result[0].metric.resource === 'memory') {
        output.resource = 'memory';
        output.limit =
          parseInt(limitData.data.result[0].values[0][1]) / 1000000;
        output.request =
          parseInt(requestData.data.result[0].values[0][1]) / 1000000;
        output.unit = 'megabytes';
      }
    }
    return output;
  } catch (err) {
    return {
      name: '',
      usage: 1,
      resource: '',
      limit: 1,
      request: 1,
      parent: '',
      namespace: '',
    };
  }
}

export async function fetchCPU(obj: any) {
  const output: SvgInfo = new SvgInfoObj();
  const podName = obj.metadata.name;
  const { startTime, endTime } = setStartAndEndTime();
  // console.log('I AM POD NAME', podName)
  if (obj?.metadata?.name) {
    output.name = obj.metadata.name;
    output.parent = obj.spec.nodeName;
    output.namespace = obj.metadata.namespace;
  }

  try {
    const limitsQuery = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_limits{pod="${podName}",resource="cpu"}&start=${startTime}&end=${endTime}&step=24h`;
    const requestsQuery = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_requests{pod="${podName}",resource="cpu"}&start=${startTime}&end=${endTime}&step=24h`;
    const limit = await fetch(limitsQuery);
    const limitData: any = await limit.json();
    const request = await fetch(requestsQuery);
    const requestData: any = await request.json();

    if (limitData.data.result[0]) {
      if (limitData.data.result[0].metric.resource === 'cpu') {
        output.resource = 'cpu';
        output.limit = limitData.data.result[0].values[0][1] * 1000;
        output.request = requestData.data.result[0].values[0][1] * 1000;
        output.unit = 'milicores';
      }
    }
    return output;
  } catch (error) {
    return {
      name: '',
      usage: 1,
      request: 1,
      resource: '',
      limit: 1,
      parent: '',
      namespace: '',
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

    const oomObject: { [index: string]: any } = {};

    const namespaceStr: string = updatedPodData[1];
    const nsColonIdx: any = namespaceStr.indexOf(':');
    const namespace: string = namespaceStr.slice(nsColonIdx + 1).trim();

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

    oomObject.namespace = namespace;
    oomObject.podName = el;
    oomObject[filteredPodData[limitIdx]] = limits;
    oomObject[filteredPodData[requestIdx]] = requests;

    filteredPodData.slice(0, 7).forEach((el: any) => {
      const colon: any = el.indexOf(':');
      // Extracts key from the left of colon and lowercases to send properly to frontend
      const key: keyof oomObject = el
        .slice(0, colon)
        .toLowerCase()
        .split(' ')
        .join('');
      // Extracts value from the right of colon and removes white space
      oomObject[key] = el.slice(colon + 2);
    });

    OOMKills.push(oomObject);
  });

  return OOMKills;
};
