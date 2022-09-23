import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
} from 'electron';
import { ClusterAllInfo } from '../client/Types';
import path from 'path';
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
//   REDUX_DEVTOOLS,
// } from 'electron-devtools-installer';

import * as k8s from '@kubernetes/client-node';
import * as cp from 'child_process';
const fetch: any = (...args: any) =>
  import('node-fetch').then(({ default: fetch }: any) => fetch(...args));

import {
  setStartAndEndTime,
  formatEvents,
  formatAlerts,
  parseNode,
  fetchMem,
  fetchCPU,
  formatOOMKills,
} from './utils';

// metrics modules
import {
  formatMatrix,
  formatUsage,
  formatAnalysis,
} from './metricsData/formatMatrix';
import { SvgInfo, SvgInfoObj } from '../client/Types';

// K8S API BOILERPLATE
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

const LOCALHOST = 'host.docker.internal';

const PROM_URL = `http://${LOCALHOST}:9090/api/v1/`;

const isDev: boolean = process.env.NODE_ENV === 'development';
// const PORT: string | number = process.env.PORT || 8080;

// this is to allow the BrowserWindow object to be referrable globally
// however, BrowserWindow cannot be created before app is 'ready'
let mainWindow: any = null;
// app.commandLine.appendSwitch('--no-sandbox --disable-gpu');

const loadMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon: path.resolve(__dirname, '../client/assets/logo_hat.ico'),
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      devTools: isDev, //whether to enable DevTools
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../client/index.html'));
  console.log('Main Window loaded file index.html');

  // check to see if port 9090 is open
  const checkPort = () => {
    fetch(`http://${LOCALHOST}:9090/`)
      .then((res: any) => {
        console.log('status code in loadMainWindow is ', res.status);
        mainWindow.show();
      })
      .catch((err: Error) => {
        console.log('fetch to 9090 has failed in main.ts in loadMainWindow');
        const num = dialog.showMessageBoxSync({
          message:
            'PALAEMON ERROR: 9090',
          type: 'warning',
          // Cancel returns 0, OK returns 1
          buttons: ['Cancel', 'OK'],
          title: 'PALAEMON',
          detail: 'Port-forward Prometheus service to port 9090, then press OK.\n \nVisit palaemon.io for more information.',
        });
        if (num === 1) checkPort();
        else if (num === 0) app.quit();
      });
  };
  checkPort();
};

app.on('ready', async () => {
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// K8S API //

// populates cluster chart cards

ipcMain.handle('getAllInfo', async (): Promise<any> => {
  // nodes

  const tempData: SvgInfo = {
    name: 'deploy',
    usage: 1,
    resource: 'deploy',
    request: 0.9,
    limit: Math.random() + 1,
    parent: 'deploy',
    namespace: 'deploy',
  };

  try {
    const nsSelect = await mainWindow.webContents
      .executeJavaScript('({...localStorage});', true)
      /* check what type this is with team */ /* check what type this is with team */
      .then((localStorage: any) => {
        return localStorage.namespace;
      });
    const getNodes = await k8sApiCore.listNode(`${nsSelect}`);
    const nodeData = getNodes.body.items.map(node => {
      return parseNode(node);
    }); // end of nodeData

    const getPods = await k8sApiCore.listNamespacedPod(`${nsSelect}`);
    // console.log('this is getPods: ',getPods.body.items[0]);

    const memData = await Promise.all(
      getPods.body.items.map(pod => {
        // console.log('this is all pods fom k8s', pod)
        return fetchMem(pod);
      })
    );
    const cpuData = await Promise.all(
      getPods.body.items.map(pod => fetchCPU(pod))
    );

    const filteredMem = memData;
    // const filteredMem = memData.filter(el => el.request > 1)
    const filteredCPU = cpuData.filter(el => el.resource === 'cpu');
    const filteredPods = filteredMem;

    for (let i = 0; i < filteredCPU.length; i++) {
      filteredPods.push(filteredCPU[i]);
    }

    if (filteredPods) {
      const newObj: ClusterAllInfo = {
        Nodes: nodeData,
        Pods: filteredPods,
      };
      return newObj;
    }
  } catch (error) {
    return [tempData];
  }
});

// get names of nodes in cluster related to selected namespace
ipcMain.handle('getNodes', async (): Promise<any> => {
  // dynamically get this from frontend later
  try {
    const nsSelect = await mainWindow.webContents
      .executeJavaScript('({...localStorage});', true)
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

// get namespaces in cluster. used for multiple queries and to display relevant data
ipcMain.handle('getNamespaces', async () => {
  try {
    const data = await k8sApiCore.listNamespace();
    const formattedData: any = data.body.items.map(pod => pod?.metadata?.name);
    return formattedData;
  } catch (error) {
    console.log(`Error in getNamespaces function: ERROR: ${error}`);
  }
});

// COMMAND LINE //
// get all events in all namespaces
ipcMain.handle('getEvents', async () => {
  try {
    const response: string = cp
      .execSync('kubectl get events --all-namespaces', {
        encoding: 'utf-8',
      })
      .toString();
    return formatEvents(response);
  } catch (error) {
    return console.log(`Error in getEvents function: ERROR: ${error}`); // add return statement to make async () => on line 112 happy
  }
});

// HOMEPAGE CHART QUERY FOR MEMORY

ipcMain.handle('getMemoryUsageByPods', async () => {
  const { startTime, endTime } = setStartAndEndTime();

  const interval = '15s';
  try {
    const nsSelect = await mainWindow.webContents
      .executeJavaScript('({...localStorage});', true)
      .then((localStorage: any) => {
        return localStorage.namespace;
      });
    // fetch time series data from prom api
    const query = `${PROM_URL}query_range?query=container_memory_working_set_bytes{namespace="${nsSelect}",image=""}&start=${startTime}&end=${endTime}&step=${interval}`;
    // fetch request
    const res = await fetch(query);
    const data = await res.json();

    return formatMatrix(data.data);
  } catch (error) {
    console.log(`Error in getMemoryUsageByPod function: ERROR: ${error}`);
    return { err: error };
  }
});

// get alerts from alert manager
ipcMain.handle('getAlerts', async (): Promise<any> => {
  try {
    const data: any = await fetch(`${PROM_URL}rules`);
    const alerts: any = await data.json();
    return formatAlerts(alerts);
  } catch (error) {
    console.log(`Error in getAlerts function: ERROR: ${error}`);
  }
});

ipcMain.handle('getOOMKills', async (): Promise<any> => {
  try {
    // query for pods' last terminated reasons
    const response = await fetch(
      `${PROM_URL}query?query=kube_pod_container_status_last_terminated_reason`
    );
    const data = await response.json();
    const pods = data.data.result;

    // filters for OOMKilledPods and returns an array of names
    const OOMKilledPods = pods
      .filter((pod: any) => pod.metric.reason === 'OOMKilled')
      .map((pod: any) => pod.metric.pod);

    return formatOOMKills(OOMKilledPods);
  } catch (error) {
    console.log(`Error in getOOMKills function: ERROR: ${error}`);
  }
});

// TEST FOR USAGE ON HOMEPAGE AND ANALYSIS PAGE

ipcMain.handle('getUsage', async (event, ...args) => {
  const time = new Date().toISOString();
  const interval = '15s';
  const podName = args[0];
  const resource = args[1];
  let namespace;
  try {
    await mainWindow.webContents
      .executeJavaScript('({...localStorage});', true)
      .then((localStorage: any) => {
        namespace = localStorage.namespace;
      });

    // fetch time series matrix both cpu and mem usage filtered by pod

    const query =
      resource === 'memory'
        ? `${PROM_URL}query_range?query=
    container_memory_working_set_bytes{namespace="${namespace}",pod="${podName}",image=""}
    &start=${time}&end=${time}&step=${interval}`
        : `${PROM_URL}query_range?query=
    sum(rate(container_cpu_usage_seconds_total{namespace="${namespace}",pod="${podName}",image=""}[5m]))
    &start=${time}&end=${time}&step=${interval}`;

    const res = await fetch(query);
    const data = await res.json();

    // based on second argument, different calculations for units will take place in formatUsage
    return resource === 'memory'
      ? formatUsage(data.data, 'megabytes')
      : formatUsage(data.data, 'milicores');
  } catch (error) {
    console.log(`Error in getUSAGE function: ERROR: ${error}`);
    return { err: error };
  }
});

/* -------------- Analysis Page -------------- */

ipcMain.handle("getAnalysis", async (event, parentNode, interval = '5m', timeOfDeath) => {
  
  const endTime = timeOfDeath;
  const now = new Date(timeOfDeath);
  const copyNow = new Date(now.getTime());
  // convert to ISO String for promQL
  copyNow.setHours(copyNow.getHours() - 1);
  const startTime: string = copyNow.toISOString();

  try {
    // build mem usage by PODS graph
    const podMEMQuery = `${PROM_URL}query_range?query=
  container_memory_working_set_bytes{node="${parentNode}",image=""}
  &start=${startTime}&end=${endTime}&step=${interval}`;
  const podMEMRes = await fetch(podMEMQuery);
  const podMEMData = await podMEMRes.json();
  const podMem = await formatAnalysis(podMEMData.data, "megabytes", startTime, endTime);
  
  // build CPU usage by PODS graph
  const podCPUQuery = `${PROM_URL}query_range?query=
  rate(container_cpu_usage_seconds_total{node="${parentNode}",image=""}[5m])
  &start=${startTime}&end=${endTime}&step=${interval}`;
    const podCPURes = await fetch(podCPUQuery);
    const podCPUData = await podCPURes.json();
    const podCPU = await formatAnalysis(podCPUData.data, 'milicores');

    // build sum of mem usage by node from start to end
    const nodeMEMQuery = `${PROM_URL}query_range?query=
  sum(container_memory_working_set_bytes{node="${parentNode}",image=""}) by (node)
  &start=${startTime}&end=${endTime}&step=${interval}`;
    const nodeMEMRes = await fetch(nodeMEMQuery);
    const nodeMEMData = await nodeMEMRes.json();
    const nodeMem = await formatAnalysis(nodeMEMData.data, 'megabytes');

    // build sum of CPU usage by node from start to end
    const nodeCPUQuery = `${PROM_URL}query_range?query=
  sum(rate(container_cpu_usage_seconds_total{node="${parentNode}",image=""}[5m])) by (node)
  &start=${startTime}&end=${endTime}&step=${interval}`;
    const nodeCPURes = await fetch(nodeCPUQuery);
    const nodeCPUData = await nodeCPURes.json();
    const nodeCPU = await formatAnalysis(nodeCPUData.data, 'milicores');

    // build network bytes read graph
    const networkReadQuery = `${PROM_URL}query_range?query=
    rate(container_network_receive_bytes_total{node="${parentNode}"}[5m])
    &start=${startTime}&end=${endTime}&step=${interval}`
    const networkReadRes = await fetch(networkReadQuery);
    const networkReadData = await networkReadRes.json();
    const netRead = await formatAnalysis(networkReadData.data, 'bytes')

    // build network bytes write graph
    const networkWriteQuery = `${PROM_URL}query_range?query=
    rate(container_network_transmit_bytes_total{node="${parentNode}"}[5m])
    &start=${startTime}&end=${endTime}&step=${interval}`
    const networkWriteRes = await fetch(networkWriteQuery);
    const networkWriteData = await networkWriteRes.json();
    const netWrite = await formatAnalysis(networkWriteData.data, 'kilobytes')

    return {
      podMem,
      podCPU,
      nodeMem,
      nodeCPU,
      netRead,
      netWrite
    };
  } catch (error) {
    console.log(`Error in getAnalysis function: ERROR: ${error}`);
    return { err: error };
  }
});