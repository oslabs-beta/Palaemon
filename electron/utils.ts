import { SvgInfo, SvgInfoObj } from "../client/Types";
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

// export function grabData(obj: any) {
//   const output: SvgInfo = new SvgInfoObj();

//   if (obj.status?.allocatable !== undefined) {
//     const memUsage: number = parseMem(obj.status.allocatable.memory);
//     output.usage = memUsage;
//   }
//   if (obj.status?.capacity !== undefined) {
//     const memLimit: number = parseMem(obj.status.capacity.memory);
//     output.limit = memLimit;
//   }
//   // (if node is truthy, and if node.metadata is truthy, and if node.metadat.name is truthy)
//   if (obj?.metadata?.name) output.name = obj.metadata.name;
//   return output;

// }

// this.request = 1;
// this.parent = '';
// this.namespace = '';