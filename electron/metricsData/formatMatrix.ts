import { Metrics } from "@kubernetes/client-node";

import { SvgInfo, ClusterChartProps } from "../../client/Types";

const fetch: any = (...args: any) =>
  import("node-fetch").then(({ default: fetch }: any) => fetch(...args));

interface matrix {
  resultType?: string;
  result: [{ metric: {}; values: Array<[number, string]> }];
}

interface graph {
  [key: string]: {
    times: string[];
    values: number[];
    limits?: number[];
    requests?: number[];
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
      // console.log('this is MEM usage', Number(el[1] / 1000000));
      return Number(el[1] / 1000000);
    });
    arr.push(output);
  });
  // console.log(arr);
  return arr;
}

export function formatUsage(matrix: matrix, unitType?: string) {
  let output;
  // console.log('matrix THIS IS ', matrix)
  matrix.result.forEach((obj: any) => {
    output = obj.values.map((el: [number, number]) => {
      // change to megabytes
      // console.log('this is MEM usage', Number(el[1] / 1000000));
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
  const limitsQuery = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_limits{pod="${podName}",resource="memory"}&start=${startTime}&end=${endTime}&step=24h`;
  const requestsQuery = `http://127.0.0.1:9090/api/v1/query_range?query=kube_pod_container_resource_requests{pod="${podName}",resource="memory"}&start=${startTime}&end=${endTime}&step=24h`;
  const limit = await fetch(limitsQuery);
  const request = await fetch(requestsQuery);
  const limitData: any = await limit.json();
  const requestData: any = await request.json();
  const output: graph = {}

  limitData.data.result.forEach((obj: any) => {
    output[limitData] = obj.values.map((el: number) => {
      return 
    })
    console.log(obj.values)
    
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
  // console.log('matrix THIS IS ', matrix)

  const dateOptions: any = {
    timeStyle: "short",
  };

  matrix.result.forEach(async (obj: any) => {
    const output: graph = {};
    let name: string = 'n/a';
    if (obj.metric.pod) {
      name = obj.metric.pod;
      reqObj = await getPodReqLimits(name, startTime, endTime)
    }
    // if theres no metric.pod, then the object being passed in is a node
    else if (!obj.metric.pod) {
      name = obj.metric.node;
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
      return;
    });
    arr.push(output);
  });
  // console.log(arr);
  return arr;
}