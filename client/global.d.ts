export {};

declare global {
  /**
   * We define all IPC APIs here to give devs auto-complete
   * use window.electron anywhere in app
   * Also note the capital "Window" here
   */
  interface Window {
    api: {
      getEvents: () => Promise<any>;
      getNodes: () => Promise<any>;
      getLogs: () => Promise<any>;
      getDeployments: () => Promise<any>;
      getMemoryUsageByPods: () => Promise<any>;
      getServices: () => Promise<any>;
      getPods: () => Promise<any>;
      getNamespaces: () => Promise<any>;
      getAlerts: () => Promise<any>;
      getAllInfo: () => Promise<any>;
    };
  }
}
