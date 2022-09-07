import { ipcRenderer, contextBridge } from 'electron';

// contextBridge allows for functions in main.ts to be available in the frontend

// Create window API with events at specific channels

// Stretch goals: Accept namespace and pass in namespace to invoke method as 2nd arg
const WINDOW_API = {
  // getNamespaces: async () => ipcRenderer.invoke('getNamespaces'),
  getNodes: async () => ipcRenderer.invoke('getNodes'),
  getDeployments: async () => ipcRenderer.invoke('getDeployments'),
  getServices: async () => ipcRenderer.invoke('getServices'),
  getPods: async () => ipcRenderer.invoke('getPods'),
  getEvents: async () => ipcRenderer.invoke('getEvents'),
  getMemoryUsageByPods: async () => ipcRenderer.invoke('getMemoryUsageByPods'),
};

// exposes WINDOW_API methods to the frontend under "window.api" object
contextBridge.exposeInMainWorld('api', WINDOW_API);
