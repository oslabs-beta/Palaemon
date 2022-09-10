import * as cp from 'child_process';
// import { app, BrowserWindow, ipcMain } from 'electron';
import * as k8s from '@kubernetes/client-node';
// import fetch from 'node-fetch';
// const fetch: any = (...args: any) =>
//   import('node-fetch').then(({ default: fetch }: any) => fetch(...args));

// import { setStartAndEndTime } from './utils';
// import path from 'path';

// K8S API BOILERPLATE
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

// // DESCRIBE POD FOR DIAGNOSTIC REPORT
// // const getPodDesc = async () => {
// //   const pods = await k8sApiCore.listNamespacedPod('default');
// //   const formattedData: any = pods.body.items.map(pod => pod?.metadata?.name);
// //   console.log(formattedData);

// //   const data = formattedData.map(pod => {
// //     // const response: any = cp.execSync(
// //     //   `kubectl get pods -n default ${pod} -o jsonpath="Name: {.metadata.name}\nCurrent Status: {.status.phase}\nPrevious State: {.status.containerStatuses[*].lastState}\nRestart Count: {.status.containerStatuses[*].restartCount}"`,
// //     //   {
// //     //     encoding: 'utf-8',
// //     //   }
// //     // );
// //     const response: any = cp.execSync(
// //       `kubectl get pods -n default ${pod} -o jsonpath="Previous State: {.status.containerStatuses[*].lastState}"`,
// //       {
// //         encoding: 'utf-8',
// //       }
// //     );
// //     console.log(response);
// //     const formattedDesc = response.split('\n');
// //     console.log(formattedDesc);

// //     const formattedObj = {};
// //     // return formattedDesc;
// //     return formattedObj;
// //   });

// //   console.log(data);
// // };

// // console.log(getPodDesc());

// // GET ALERTS
const getAlerts = async () => {
  const PROM_URL = 'http://127.0.0.1:9090/api/v1';
  const data: any = await fetch(`${PROM_URL}/rules`);
  const alerts: any = await data.json();
  const formattedData: object[] = [];
  alerts.data.groups.forEach((group: any) => {
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
        formattedData.push(alert);
      }
    });
  });
  return formattedData;
};

console.log(getAlerts());
// // // GET PODS

// const getPods = async (): Promise<any> => {
//   try {
//     const data = await k8sApiCore.listPodForAllNamespaces();
//     // console.log(data);
//     // console.log(data.body.items[0].metadata);
//     const formattedData: string[] = data.body.items.map(
//       (pod: any) => pod?.metadata?.name
//     );
//     console.log(Array.isArray(formattedData));
//     // array of strings (names)
//     console.log(formattedData);
//     return formattedData;
//   } catch (error) {
//     console.log(`Error in getPods function: ERROR: ${error}`);
//   }
// };

// console.log(getPods());

// // // GET SERVICES
// // const getSvcs = async () => {
// //   try {
// //     const data = await k8sApiCore.listServiceForAllNamespaces();
// //     // console.log(data.body.items[0].metadata.name);
// //     const formattedData = data.body.items.map(pod => pod?.metadata?.name);
// //     console.log(formattedData);
// //     // array of strings (names)
// //     console.log(formattedData);
// //     return formattedData;
// //   } catch (error) {
// //     console.log(`Error in getPods function: ERROR: ${error}`);
// //   }
// // };

// // // console.log(getSvcs());

// // // GET DEPLOYMENTS
// // const getDeploy = async () => {
// //   try {
// //     const data = await k8sApiApps.listDeploymentForAllNamespaces();
// //     // console.log(data);
// //     const formattedData = data.body.items.map(pod => pod?.metadata?.name);
// //     console.log(formattedData);
// //     // array of strings (names)
// //     console.log(formattedData);

// //     return formattedData;
// //   } catch (error) {
// //     console.log(`Error in getPods function: ERROR: ${error}`);
// //   }
// // };

// // // console.log(getDeploy());

// // const getNode = async () => {
// //   try {
// //     const namespace = 'default';
// //     const data = await k8sApiCore.listNode(namespace);
// //     // console.log(data);
// //     const formattedData = data.body.items.map(pod => pod?.metadata?.name);
// //     console.log(formattedData);
// //     // array of strings (names)
// //     console.log(formattedData);
// //     return formattedData;
// //   } catch (error) {
// //     console.log(`Error in getPods function: ERROR: ${error}`);
// //   }
// // };

// // // console.log(getNode());

// // const getNs = async () => {
// //   try {
// //     const data = await k8sApiCore.listNamespace();
// //     // console.log(data);
// //     const formattedData = data.body.items.map(pod => pod?.metadata?.name);
// //     console.log(formattedData);
// //     // array of strings (names)
// //     return formattedData;
// //   } catch (error) {
// //     console.log(`Error in getPods function: ERROR: ${error}`);
// //   }
// // };

// // console.log(getNs());

// // GET EVENTS
// const response: string = cp
//   .execSync('kubectl get events --all-namespaces', {
//     encoding: 'utf-8',
//   })
//   .toString();

// const data: string[] = response.split('\n');

// const trimmed: string[] = data.map((el: any) => el.split(/[ ]{2,}/));
// const formattedEvents: {}[] = trimmed.map((event: any) => {
//   return {
//     namespace: event[0],
//     lastSeen: event[1],
//     severity: event[2],
//     reason: event[3],
//     message: event[4],
//     object: event[5],
//   };
// });

// // formattedEvents.pop();

// console.log(formattedEvents.slice(1, -1));

// // // TIME
// // const test = new Date();
// // const testCopy = new Date(test.getTime());
// // // console.log(testCopy);
// // testCopy.setHours(testCopy.getHours() - 24);
// // // console.log('START', testCopy.toISOString());
// // // console.log('END', new Date().toISOString());

// // // {
// // //   "status": "success",
// // //   "data": {
// // //       "resultType": "matrix",
// // //       "result": [
// // //           {
// // //               "metric": {
// // //                   "pod": "nodejs-guestbook-backend-c9b7887f9-npzrr"
// // //               },
// // //               "values": [
// // //                   [
// // //                       1662461863.033,
// // //                       "73625600"
// // //                   ],
// // //                   [
// // //                       1662483463.033,
// // //                       "73273344"
// // //                   ],
// // //                   [
// // //                       1662505063.033,
// // //                       "73986048"
// // //                   ]
// // //               ]
// // //           },
// // //           {
// // //               "metric": {
// // //                   "pod": "nodejs-guestbook-frontend-74f496b5cd-8x7pv"
// // //               },
// // //               "values": [
// // //                   [
// // //                       1662461863.033,
// // //                       "65695744"
// // //                   ],
// // //                   [
// // //                       1662483463.033,
// // //                       "69201920"
// // //                   ],
// // //                   [
// // //                       1662505063.033,
// // //                       "60035072"
// // //                   ]
// // //               ]
// // //           },
// // //           {
// // //               "metric": {
// // //                   "pod": "nodejs-guestbook-mongodb-77c9c685d7-wlqsl"
// // //               },
// // //               "values": [
// // //                   [
// // //                       1662461863.033,
// // //                       "133152768"
// // //                   ],
// // //                   [
// // //                       1662483463.033,
// // //                       "134103040"
// // //                   ],
// // //                   [
// // //                       1662505063.033,
// // //                       "133865472"
// // //                   ]
// // //               ]
// // //           }
// // //       ]
// // //   }
// // // }

// // // const hi1: bigint = BigInt(10);
// // // const hi2: bigint = 100000n

// // const time = 1662461863.033 * 1000;
// // // console.log(new Date(time));
