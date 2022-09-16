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
    units?: string[];
  };
}


export function formatMatrix(matrix: matrix, unitType?: string) {
  const arr: any = [];
  // console.log('matrix THIS IS ', matrix)


  const dateOptions: any = {
    // dateStyle: "full",
    timeStyle: "short"

  }

  matrix.result.forEach((obj: any) => {
    const output: graph = {};

    const podName: string = obj.metric[Object.keys(obj.metric)[0]];

    output[podName] = {
      times: [],
      values: [],
      units: []
    };


    output[podName].times = obj.values.map((el: [number, number]) => {

      // time value
      return new Date(el[0] * 1000).toLocaleTimeString('en-US', dateOptions);

    });
    //this is bytes/units - convert bytes to GB when unit type is bytes
    if (unitType === 'megabytes') {
      output[podName].values = obj.values.map((el: [number, number]) =>
        // do i need to remove a 0 here??? -pat
        Number(el[1] / 10000000)
      );
    }
    else if (unitType === 'milicores') {
      output[podName].values = obj.values.map((el : [number, number]) =>
      
      Number(el[1]/1000)
      )
    }

    arr.push(output);
  });
  // console.log(arr);
  return arr;
}
