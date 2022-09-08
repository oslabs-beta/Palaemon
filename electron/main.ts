import { app, BrowserWindow, ipcMain } from 'electron';
import * as k8s from '@kubernetes/client-node';
import * as cp from 'child_process';
import fetch from 'node-fetch';
// const fetch: any = (...args: any) =>
//   import('node-fetch').then(({ default: fetch }: any) => fetch(...args));

import { setStartAndEndTime } from './utils';
import path from 'path';

// K8S API BOILERPLATE
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

const PROM_URL = 'http://127.0.0.1:9090/api/v1/';

const isDev: boolean = process.env.NODE_ENV === 'development';
const PORT: string | number = process.env.PORT || 8080;

// this is to allow the BrowserWindow object to be referrable globally
// however, BrowserWindow cannot be created before app is 'ready'
let mainWindow: any = null;

const loadMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname + '/preload.js'), // loads from /dist/electron/preload.js
      nodeIntegration: true,
      contextIsolation: true,
      devTools: isDev, //whether to enable DevTools
      // preload: path.join(__dirname, "preload.js")
    },
  });

  // depending on whether this is dev mode or production mode
  // if dev mode, open port 8080 to share server
  // if production mode, open directly from build file in /dist folder
  if (isDev) {
    mainWindow.loadURL(`http://localhost:${PORT}`);
    console.log(`Main Window loaded PORT ${PORT}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../client/index.html'));
    console.log('Main Window loaded file index.html');
  }
};

app.on('ready', loadMainWindow);
// invoke preload? to load up all the data..? maybe

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// K8S API //

// get nodes in cluster
ipcMain.handle('getNodes', async () => {
  // dynamically get this from frontend later
  const namespace = 'default';
  try {
    const data = await k8sApiCore.listNode(namespace);
    console.log('heres namespace data', data)
    return data;
  } catch (error) {
    return console.log(`Error in getNodes function: ERROR: ${error}`);
  }
});

// get deployments in cluster

ipcMain.handle('getDeployments', async () => {
  try {
    const data = k8sApiApps.listDeploymentForAllNamespaces();
  } catch (error) {
    console.log(`Error in getDeployments function: ERROR: ${error}`);
  }
});

// get services in cluster
ipcMain.handle('getServices', async () => {
  try {
    const data = k8sApiCore.listServiceForAllNamespaces();
  } catch (error) {
    console.log(`Error in getServices function: ERROR: ${error}`);
  }
});

// get pods in cluster
ipcMain.handle('getPods', async () => {
  try {
    const data = await k8sApiCore.listPodForAllNamespaces();
  } catch (error) {
    console.log(`Error in getPods function: ERROR: ${error}`);
  }
});

// get namespaces in cluster
ipcMain.handle('getNamespaces', async () => {
  try {
    const data = await k8sApiCore.listNamespace();
  } catch (error) {
    console.log(`Error in getNamespaces function: ERROR: ${error}`);
  }
});

// COMMAND LINE //
// get events
ipcMain.handle('getEvents', async () => {
  try {
    const data = await cp.execSync('kubectl get events --all-namespaces', {encoding: 'utf-8'});
    // divides each event into subarrs
    const trimmed: any = data.map((el:any) => el.split(/[ ]{2,}/));    // added any type here.. made split happy? whats the data we get back
    // lowercase the headers of events
    const eventHeaders = trimmed[0].map((header:any) => header.toLowerCase()); // any type because we can
    // remove headers from trimmed arr
    trimmed.shift();

    const formattedEvents = trimmed.map((event:any) => { // any type because we can
      return {
        namespace: event[0],
        lastSeen: event[1],
        severity: event[2],
        reason: event[3],
        message: event[4],
        object: event[5],
      };
    });
    
    return { formattedEvents, eventHeaders };

  } catch (error) {
    return console.log(`Error in getEvents function: ERROR: ${error}`); // add return statement to make async () => on line 112 happy
  }
});

// PROMETHEUS API //
// get memory metrics
ipcMain.handle('getMemoryUsageByPods', async (event: any) => {
  try {
    const { startTime, endTime } = setStartAndEndTime();
    const interval = '1m';
    const query = `${PROM_URL}query_range?query=sum(container_memory_working_set_bytes{namespace="default"}) by (pod)&start=${startTime}&end=${endTime}&step=${interval}`;
    const data = await fetch(query);
    // NEED TO MANIPULATE RETURNED DATA TO CORRECT FORMAT
  } catch (error) {
    console.log(`Error in getMemoryUsageByPod function: ERROR: ${error}`);
  }
});

// get alerts
ipcMain.handle('getAlerts', async () => {
  try {
    const response = await fetch(`${PROM_URL}/rules`);
  } catch (error) {
    console.log(`Error in getAlerts function: ERROR: ${error}`);
  }
});