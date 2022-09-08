import { Metrics } from "@kubernetes/client-node";

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
  };
}
// interface graph2 {
//   [key: string] : string,
//   times : string[],
//   values: number[]

// }
export function formatMatrix(matrix: matrix, unitType?: string) {
  const arr: any = [];
  // console.log('matrix THIS IS ', matrix)
  
  // podName: {
    // times: Array
    // values: array
    // }
    
  matrix.result.forEach((obj: any) => {
    const output: graph = {};
    
    const podName: string = obj.metric[Object.keys(obj.metric)[0]];

    output[podName] = {
      times: [],
      values: [],
    };

    // output[podName].times = obj.values.map((el: [number, string]) => convertUnixToISOString(el[0]));
    output[podName].times = obj.values.map((el: [number, number]) => {
      return new Date(el[0] * 1000).toISOString();
    });
    //convert bytes to GB when unit type is bytes
    output[podName].values = obj.values.map((el: [number, number]) =>
      Number(el[1] / 10000000)
    );

    arr.push(output);
  });
  // console.log(arr);
  return arr;
}

// const data = {
//   resultType: "matrix",
//   result: [
//     {
//       metric: {
//         pod: "nodejs-guestbook-backend",
//       },
//       values: [
//         [1662596005.098, "173531136"],
//         [1662599605.098, "177111040"],
//       ],
//     },
//     {
//       metric: {
//         pod: "nodejs-guestbook-frontend",
//       },
//       values: [
//         [12345, "12345"],
//         [23456, "23456"],
//       ],
//     },
//   ],
// };

// const test = formatMatrix(data, 'bytes')
// console.log(test)