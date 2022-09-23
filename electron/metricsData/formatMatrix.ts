import { Metrics } from "@kubernetes/client-node";

import { SvgInfo, ClusterChartProps } from "../../client/Types";

const fetch: any = (...args: any) =>
  import("node-fetch").then(({ default: fetch }: any) => fetch(...args));
  const LOCALHOST = 'host.docker.internal';
interface matrix {
  resultType?: string;
  result: [{ metric: {}; values: Array<[number, string]> }];
}

interface graph {
  [name: string]: {
    times: string[];
    values: number[];
    limits?: number;
    requests?: number;
    // units?: string;
  };
}

export function formatMatrix(matrix: matrix, unitType?: string) {
  const arr: any = [];
  // console.log('matrix THIS IS ', matrix)

  const dateOptions: any = {
    // dateStyle: "full",
    timeStyle: "short",
  };

  matrix.result.forEach((obj: any) => {
    const output: graph = {};

    const podName: string = obj.metric.pod;
    output[podName] = {
      times: [],
      values: [],
      // units: '',
    };

    output[podName].times = obj.values.map((el: [number, number]) => {
      // time value
      return new Date(el[0] * 1000).toLocaleTimeString("en-US", dateOptions);
    });
    //this is bytes/units - convert bytes to GB when unit type is bytes

    output[podName].values = obj.values.map((el: [number, number]) => {
      // change to megabytes

      return Number(el[1] / 1000000);
    });
    arr.push(output);
  });

  return arr;
}

export function formatUsage(matrix: matrix, unitType?: string) {
  let output;

  matrix.result.forEach((obj: any) => {
    output = obj.values.map((el: [number, number]) => {
      // change to megabytes

      if (unitType === "megabytes") {
        return Number(el[1] / 1000000);
      } else {
        return Number(el[1] * 1000);
      }
    });
  });
  return output;
}

export async function getPodReqLimits(podName: string, startTime?: string, endTime?: string) {
  const limitsQuery = `http://${LOCALHOST}:9090/api/v1/query_range?query=kube_pod_container_resource_limits{pod="${podName}",resource="memory"}&start=${startTime}&end=${endTime}&step=24h`;
  const requestsQuery = `http://${LOCALHOST}:9090/api/v1/query_range?query=kube_pod_container_resource_requests{pod="${podName}",resource="memory"}&start=${startTime}&end=${endTime}&step=24h`;
  const limit = await fetch(limitsQuery);
  const request = await fetch(requestsQuery);
  const limits: any = await limit.json();
  const requests: any = await request.json();
  let limitData:any;
  let requestData:any;

  limits.data.result.forEach((obj: any) => {
    limitData = obj.values.map((entry: [number, number]) => {
      return Number(entry[1] / 1000000)
    })

  
  requests.data.result.forEach((obj: any) => {
    requestData = obj.values.map((entry: [number, number]):any => {
      return Number(entry[1] / 1000000)
    })
  })
  
  // console.log('limitdata', limitData)
  // console.log('requestdata', requestData)
  })
  return {
    limitData,
    requestData
  }
}

export async function formatAnalysis(matrix: matrix, unitType?: string,  startTime?: string, endTime?: string) {
  const arr: any = [];
  let reqObj: any = {
    limitData: [],
    requestData: []
  }

  const dateOptions: any = {
    timeStyle: "short",
  };

  await matrix.result.forEach(async (obj: any) => {

    const output: graph = {};
    let name: string = 'n/a';
    if (obj.metric.pod) {
      name = obj.metric.pod;
      if (unitType === "megabytes") {
        reqObj = await getPodReqLimits(name, startTime, endTime)
      }
    }
    // if theres no metric.pod, then the object being passed in is a node
    else if (!obj.metric.pod) {
      name = obj.metric.node;
    }
    if (!reqObj.limitData){

      reqObj = {
        limitData: [],
        requestData: []
      }
    }
    output[name] = {
      times: [],
      values: [],
      limits: reqObj.limitData,
      requests: reqObj.requestData
    };

    output[name].times = obj.values.map((el: [number, number]) => {
      // time value
      return new Date(el[0] * 1000).toLocaleTimeString("en-US", dateOptions);
    });
    //this is bytes/units - convert bytes to GB when unit type is bytes

    output[name].values = obj.values.map((el: [number, number]) => {
      // change to megabytes

      if (unitType === "megabytes") return Number(el[1] / 1000000);
      else if (unitType === "milicores") return Number(el[1]*1000)
      else if (unitType === "kilobytes") return Number(el[1]/1000)
      else if (unitType === "bytes") return Number(el[1])
      return;
    });

    arr.push(output);
  });
  
  return arr;
}