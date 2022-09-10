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
  return formattedEvents;
};

export const formatAlerts = (data: any): {}[] => {
  const formattedAlerts: object[] = [];
  data.data.groups.forEach((group: any) => {
    group.rules.forEach((rule: any) => {
      if (rule.state) {
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
