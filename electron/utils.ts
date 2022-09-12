import { SvgInfo, SvgInfoObj } from "../client/Types";

const fetch: any = (...args: any) =>
  import("node-fetch").then(({ default: fetch }: any) => fetch(...args));

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

export function parseMem(entry:string) {
  // if dealing with memory (ki, mb, mi, etc.)

  return parseInt(entry.slice(0, entry.length-2))
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
    const {startTime, endTime} = setStartAndEndTime()
    const podName = obj.metadata.name
    try {
      const query1 = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_limits{pod="${podName}"}&start=${startTime}&end=${endTime}&step=24h`;
      const query2 = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_requests{pod="${podName}"}&start=${startTime}&end=${endTime}&step=24h`;
      const data1 = await fetch(query1);
      // console.log('THIS IS DATA ONE UNO ', data1)
      const jsonData1: any = await data1.json();
      // console.log(' HERE IS JASON DATA ONE', jsonData1.data.result)
      const data2 = await fetch(query2);
      const jsonData2: any = await data2.json();
      if (jsonData1.data.result[0]) {
        output.limit = parseInt(jsonData1.data.result[0].values[0][1]);
        console.log('OUTPUT LIMITS', output.limit)
      }

      if (jsonData2.data.result[0]) {
        // console.log('I AM ENTERING CONDITIONAL')
        // output.limit = jsonData1.data.result[0].values[0][1];
        // console.log('OUTPUT LIMITS', output.limit)
        output.request = parseInt(jsonData2.data.result[0].values[0][1]);
        // return console.log('THIS IS REQUEST LIMITS ', output.request)
      }

      output.parent = obj.spec.nodeName;
      output.namespace = obj.metadata.namespace;
    
      // console.log('output sent back to main ', output)
      return output;
    } catch (error) {
      return { err: error };
    }
}


// export function parsePod(obj: any) {

//       const podName = obj.metadata.name
//       const {startTime, endTime} = setStartAndEndTime()
//       const query1 = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_limits{pod="${podName}"}&start=${startTime}&end=${endTime}&step=24h`;
//       // const query2 = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_requests{pod="${podName}"}&start=${startTime}&end=${endTime}&step=24h`;
//       console.log('im starting to parse the pods!!')
//       const testset = fetch(query1)
//       .then((res: any) => res.json())
//       .then((data: any) => {
//         console.log('I have fetched correctly')
//         // console.log('THIS IS DATA!!!', data)
//         if (data.data.result.length >= 1) {

//         const output: SvgInfo = new SvgInfoObj();

//         // (if node is truthy, and if node.metadata is truthy, and if node.metadat.name is truthy)
//         if (obj?.metadata?.name) output.name = obj.metadata.name;
//         // (async (): Promise<any> => {
//           console.log('ENTERING CONDITIONAL')
//           output.limit = data.data.result[0].values[0][1];
//           // console.log('OUTPUT LIMITS', output.limit)
//           output.parent = obj.spec.nodeName;
//           output.namespace = obj.metadata.namespace;
//         // these returns dont do anything
//           console.log('I am the output of fetch: ', output)
//           return output
//         }
//         return console.log('oh god i didnt return the right thing');
//         // these returns dont do anything
//       }).catch((err:any) => {err:err})

//       //if we return output out here.. it sends output template to main.ts
//   // return output;
//   // return testset
// }
// this.usage = 1;

// this.request = 1;
// this.limit = 1;
