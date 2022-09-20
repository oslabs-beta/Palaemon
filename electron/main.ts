import {
  app,
  session,
  BrowserWindow,
  ipcMain,
  dialog,
  IpcMainEvent,
} from "electron";
import { ClusterAllInfo, ChartGraphData } from "../client/Types";
import path from "path";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";

import * as k8s from "@kubernetes/client-node";
import * as cp from "child_process";
const fetch: any = (...args: any) =>
  import("node-fetch").then(({ default: fetch }: any) => fetch(...args));

import {
  setStartAndEndTime,
  formatClusterData,
  formatEvents,
  formatAlerts,
  parseNode,
  fetchMem,
  fetchCPU,
  formatOOMKills,
} from "./utils";

// metrics modules
import { formatMatrix, formatUsage, formatAnalysis } from "./metricsData/formatMatrix";
import { SvgInfo, SvgInfoObj } from "../client/Types";
// K8S API BOILERPLATE
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

const PROM_URL = "http://127.0.0.1:9090/api/v1/";

const isDev: boolean = process.env.NODE_ENV === "development";
// const PORT: string | number = process.env.PORT || 8080;

// this is to allow the BrowserWindow object to be referrable globally
// however, BrowserWindow cannot be created before app is 'ready'
let mainWindow: any = null;

const loadMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon: path.resolve(__dirname, "../client/assets/logo_hat.ico"),
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      devTools: isDev, //whether to enable DevTools
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../client/index.html"));
  console.log("Main Window loaded file index.html");

  // check to see if port 9090 is open
  const checkPort = () => {
    fetch("http://localhost:9090/")
      .then((res: any) => {
        console.log("status code in loadMainWindow is ", res.status);
        mainWindow.show();
      })
      .catch((err: Error) => {
        console.log("fetch to 9090 has failed in main.ts in loadMainWindow");
        const num = dialog.showMessageBoxSync({
          message:
            "PALAEMON: Please make sure port-forwarding to 9090 is set up.",
          type: "warning",
          // Cancel returns 0, OK returns 1
          buttons: ["Cancel", "OK"],
          title: "PALAEMON: Port 9090 missing",
          detail: "Open Port 9090 for prometheus, then click OK.",
        });
        if (num === 1) checkPort();
        else if (num === 0) app.quit();
      });
  };
  checkPort();
};

app.on("ready", async () => {
  // if(isDev){
  //   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  //   const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  //   installExtension(
  //     extensions,
  //     {loadExtensionOptions: {allowFileAccess: true}, forceDownload: forceDownload}
  //   ).then((name:string) => {console.log(`Added Extension: ${name}`)})
  //    .then(loadMainWindow)
  //   //  .catch((err: Error) => {console.log('There was an Error: ', err)})
  // }
  // else loadMainWindow();
  loadMainWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// K8S API //

// get all info function for initial load and reloads

ipcMain.handle("getAllInfo", async (): Promise<any> => {
  // nodes

  const tempData: SvgInfo = {
    name: "deploy",
    usage: 1,
    resource: "deploy",
    request: 0.9,
    limit: Math.random() + 1,
    parent: "deploy",
    namespace: "deploy",
  };

  try {
    const nsSelect = await mainWindow.webContents
      .executeJavaScript("({...localStorage});", true)
      /* check what type this is with team */ /* check what type this is with team */
      .then((localStorage: any) => {
        return localStorage.namespace;
      });
    const getNodes = await k8sApiCore.listNode(`${nsSelect}`);
    const nodeData = getNodes.body.items.map((node) => {
      return parseNode(node);
    }); // end of nodeData

    const getPods = await k8sApiCore.listNamespacedPod(`${nsSelect}`);
    // console.log('this is getPods: ',getPods.body.items[0]);

    const memData = await Promise.all(
      getPods.body.items.map((pod) => {
        // console.log('this is all pods fom k8s', pod)
        return fetchMem(pod);
      })
    );
    const cpuData = await Promise.all(
      getPods.body.items.map((pod) => fetchCPU(pod))
    );

    const filteredMem = memData;
    // const filteredMem = memData.filter(el => el.request > 1)
    const filteredCPU = cpuData.filter((el) => el.resource === "cpu");
    const filteredPods = filteredMem;

    for (let i = 0; i < filteredCPU.length; i++) {
      filteredPods.push(filteredCPU[i]);
    }

    if (filteredPods) {
      const newObj: ClusterAllInfo = {
        Clusters: [
          {
            name: "",
            usage: 1,
            resource: "memory",
            limit: 1,
            request: 1,
            parent: "",
            namespace: "",
          },
        ],
        Nodes: nodeData,
        Pods: filteredPods,
        Deployments: [tempData],
      };
      return newObj;
    }
  } catch (error) {
    return [tempData];
  }
});

// get nodes in cluster
ipcMain.handle("getNodes", async (): Promise<any> => {
  // dynamically get this from frontend later
  try {
    const nsSelect = await mainWindow.webContents
      .executeJavaScript("({...localStorage});", true)
      /* check what type this is with team */ /* check what type this is with team */
      .then((localStorage: any) => {
        return localStorage.namespace;
      });
    const data = await k8sApiCore.listNode(`${nsSelect}`);

    return data.body.items;
  } catch (error) {
    return console.log(`Error in getNodes function: ERROR: ${error}`);
  }
});

// get deployments in cluster
// ipcMain.handle('getDeployments', async (): Promise<any> => {
//   try {
//     const data = await k8sApiApps.listDeploymentForAllNamespaces();
//     const formattedData: any = data.body.items.map(pod => pod?.metadata?.name);
//     // console.log("THIS IS DATA ", formattedData);
//     return formattedData;
//   } catch (error) {
//     console.log(`Error in getDeployments function: ERROR: ${error}`);
//   }
// });

// // get pods in cluster
// ipcMain.handle('getPods', async (): Promise<any> => {
//   try {
//     const nsSelect = await mainWindow.webContents
//       .executeJavaScript('({...localStorage});', true)
//         /* check what type this is with team */        /* check what type this is with team */
//       .then((localStorage: any) => {
//         return localStorage.namespace
//       });
//     // const data = await k8sApiCore.listPodForAllNamespaces();
//     const data = await k8sApiCore.listNamespacedPod('default')
//     console.log('HERES THE PODS', data)
//     // const data = await k8sApiCore.listPodForAllNamespaces();
//     // console.log('THIS OS BODY.ITEMS ', data.body.items);
//     const podNames: (string | undefined)[] = data.body.items.map(
//       pod => pod?.metadata?.name
//     );
//     const node: (string | undefined)[] = data.body.items.map(
//       pod => pod?.spec?.nodeName
//     );
//     const namespace: (string | undefined)[] = data.body.items.map(
//       pod => pod?.metadata?.namespace
//     );
//     // console.log('I AM INEVITABLSDFSDFSDFSDFS: ', data.body.items[0])
//     return { podNames, node, namespace };
//   } catch (error) {
//     return console.log(`Error in getPods function: ERROR: ${error}`);
//   }
// });

// get namespaces
ipcMain.handle("getNamespaces", async () => {
  try {
    const data = await k8sApiCore.listNamespace();
    const formattedData: any = data.body.items.map(
      (pod) => pod?.metadata?.name
    );
    return formattedData;
  } catch (error) {
    console.log(`Error in getNamespaces function: ERROR: ${error}`);
  }
});

// COMMAND LINE //
// get events
ipcMain.handle("getEvents", async () => {
  try {
    const response: string = cp
      .execSync("kubectl get events --all-namespaces", {
        encoding: "utf-8",
      })
      .toString();
    return formatEvents(response);
  } catch (error) {
    return console.log(`Error in getEvents function: ERROR: ${error}`); // add return statement to make async () => on line 112 happy
  }
});

// HOMEPAGE CHART QUERY FOR MEMORY //

ipcMain.handle("getMemoryUsageByPods", async () => {
  const { startTime, endTime } = setStartAndEndTime();
  // const query = `http://127.0.0.1:9090/api/v1/query_range?query=sum(container_memory_working_set_bytes{namespace="default"}) by (pod)&start=2022-09-07T05:13:25.098Z&end=2022-09-08T05:13:59.818Z&step=1m`
  const interval = "15s";
  try {
    const nsSelect = await mainWindow.webContents
      .executeJavaScript("({...localStorage});", true)
      /* check what type this is with team */ /* check what type this is with team */
      .then((localStorage: any) => {
        return localStorage.namespace;
      });
    // fetch time series data from prom api
    // included regex bang to exclude a random helm install we did on our GKE. remove or replace before deploying
    const query = `${PROM_URL}query_range?query=container_memory_working_set_bytes{namespace="${nsSelect}",image="",service!~"daddy-kube-prometheus-stac-kubelet"}&start=${startTime}&end=${endTime}&step=${interval}`;
    // fetch request
    const res = await fetch(query);
    const data = await res.json();

    // data.data.result returns matrix
    return formatMatrix(data.data);
  } catch (error) {
    console.log(`Error in getMemoryUsageByPod function: ERROR: ${error}`);
    return { err: error };
  }
});

// get alerts
ipcMain.handle("getAlerts", async (): Promise<any> => {
  try {
    const data: any = await fetch(`${PROM_URL}rules`);
    const alerts: any = await data.json();
    return formatAlerts(alerts);
  } catch (error) {
    console.log(`Error in getAlerts function: ERROR: ${error}`);
  }
});

ipcMain.handle("getOOMKills", async (): Promise<any> => {
  try {
    // query for pods' last terminated reasons
    const response = await fetch(
      `${PROM_URL}query?query=kube_pod_container_status_last_terminated_reason`
    );
    const data = await response.json();
    const pods = data.data.result;

    // filters for OOMKilledPods and returns an array of names
    const OOMKilledPods = pods
      .filter((pod: any) => pod.metric.reason === "OOMKilled")
      .map((pod: any) => pod.metric.pod);

    return formatOOMKills(OOMKilledPods);
  } catch (error) {
    console.log(`Error in getOOMKills function: ERROR: ${error}`);
  }
});

// TEST FOR USAGE ON HOMEPAGE AND ANALYSIS PAGE

ipcMain.handle("getUsage", async (event, ...args) => {
  const time = new Date().toISOString();
  const interval = "15s";
  const podName = args[0];
  const resource = args[1];
  let namespace;
  try {
    await mainWindow.webContents
      .executeJavaScript("({...localStorage});", true)
      .then((localStorage: any) => {
        namespace = localStorage.namespace;
      });

    // fetch time series data from prom api
    // included regex bang to exclude a random helm install we did on our GKE. remove or replace before deploying
    const query =
      resource === "memory"
        ? `${PROM_URL}query_range?query=
    container_memory_working_set_bytes{namespace="${namespace}",pod="${podName}",image="",service!~"daddy-kube-prometheus-stac-kubelet"}
    &start=${time}&end=${time}&step=${interval}`
        : `${PROM_URL}query_range?query=
    sum(rate(container_cpu_usage_seconds_total{namespace="${namespace}",pod="${podName}",image="",service!~"daddy-kube-prometheus-stac-kubelet"}[5m]))
    &start=${time}&end=${time}&step=${interval}`;

    const res = await fetch(query);
    const data = await res.json();

    return resource === "memory"
      ? formatUsage(data.data, "megabytes")
      : formatUsage(data.data, "milicores");
  } catch (error) {
    console.log(`Error in getUSAGE function: ERROR: ${error}`);
    return { err: error };
  }
});

/* -------------- Analysis Page -------------- */

ipcMain.handle("getAnalysis", async (event, parentNode, interval = '15s') => {
  console.log('parentnode from mainWindow.ts',parentNode)
  console.log('this is interval', interval)
  const startTime = new Date().toISOString();
  const endTime = new Date().toISOString();
  // const interval = '15s'
  // const namespace = await mainWindow.webContents
  // .executeJavaScript("({...localStorage});", true)
  // .then((localStorage: any) => {
  //   return localStorage.namespace;
  // });
  try {

  // build mem usage by PODS graph
  const podMEMQuery = `${PROM_URL}query_range?query=
  container_memory_working_set_bytes{node="${parentNode}",image="",service!~"daddy-kube-prometheus-stac-kubelet"}
  &start=${startTime}&end=${endTime}&step=${interval}`;
  const podMEMRes = await fetch(podMEMQuery);
  const podMEMData = await podMEMRes.json();
  const podMem = await formatAnalysis(podMEMData.data, "megabytes")
  console.log('this is podMem', podMem)
  // build mem usage by PODS graph
  const podCPUQuery = `${PROM_URL}query_range?query=
  rate(container_cpu_usage_seconds_total{node="${parentNode}",image="",service!~"daddy-kube-prometheus-stac-kubelet"}[5m])
  &start=${startTime}&end=${endTime}&step=${interval}`;
  const podCPURes = await fetch(podCPUQuery);
  const podCPUData = await podCPURes.json();
  const podCPU = await formatAnalysis(podCPUData.data, "milicores")

  // build node usage by MEMS graph gke-guestbook-my-first-c-default-pool-feaf7786-h6kd
  const nodeMEMQuery = `${PROM_URL}query_range?query=
  sum(container_memory_working_set_bytes{node="${parentNode}",image="",service!~"daddy-kube-prometheus-stac-kubelet"}) by (node)
  &start=${startTime}&end=${endTime}&step=${interval}`;
  const nodeMEMRes = await fetch(nodeMEMQuery);
  const nodeMEMData = await nodeMEMRes.json();
  const nodeMEM = await formatAnalysis(nodeMEMData.data, "megabytes")

  // build node usage by CPU graph
  const nodeCPUQuery = `${PROM_URL}query_range?query=
  sum(rate(container_cpu_usage_seconds_total{node="${parentNode}",image="",service!~"daddy-kube-prometheus-stac-kubelet"}[5m])) by (node)
  &start=${startTime}&end=${endTime}&step=${interval}`;
  const nodeCPURes = await fetch(nodeCPUQuery);
  const nodeCPUData = await nodeCPURes.json();
  const nodeCPU = await formatAnalysis(nodeCPUData.data, "milicores")

    return {
      podMem,
      podCPU,
      nodeMEM,
      nodeCPU
    }
  }
  catch (error) {
    console.log(`Error in getAnalysis function: ERROR: ${error}`);
    return { err: error };
  }

})

// export type GraphData = {
//   [podName: string]: {
//     times: string[];
//     values: number[];
//   };
// }[];

// export type ChartGraphData = {
//   nodeMem: GraphData;
//   nodeCPU: GraphData;
//   podMem: GraphData;
//   podCPU: GraphData;
//   netRead: GraphData;
//   netWrite: GraphData;
// };