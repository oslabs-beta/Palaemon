import { app, BrowserWindow, ipcMain } from 'electron';
import * as k8s from '@kubernetes/client-node';
import * as cp from 'child_process';
import fetch from 'node-fetch';
import { setStartAndEndTime } from './utils';
import path from 'path';

// K8S API BOILERPLATE
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiApps = kc.makeApiClient(k8s.AppsV1Api);

const PROM_URL = 'http://127.0.0.1:9090/api/v1/';

const loadMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname + 'preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, './index.html'));
  // mainWindow.loadURL('http://localhost:8080/');
  // mainWindow.on('ready-to-show', () => mainWindow.show());
};

app.on('ready', loadMainWindow);
// invoke preload? to load up all the data..? maybe

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     loadMainWindow();
//   }
// });

// K8S API //

// get nodes in cluster
ipcMain.handle('getNodes', async () => {
  // dynamically get this from frontend later
  const namespace = 'default';
  try {
    const data = k8sApiCore.listNode(namespace);
  } catch (error) {
    console.log(`Error in getNodes function: ERROR: ${error}`);
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
ipcMain.handle('getEvents', () => {
  try {
    const response = cp.execSync('kubectl get events --all-namespaces', {
      encoding: 'utf-8',
    });
  } catch (error) {
    console.log(`Error in getEvents function: ERROR: ${error}`);
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
