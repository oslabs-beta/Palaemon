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
