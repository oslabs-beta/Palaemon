import "@testing-library/jest-dom/extend-expect";

declare global {
  /**
   * We define all IPC APIs here to give devs auto-complete
   * use window.electron anywhere in app
   * Also note the capital "Window" here. When accessing window object, the "w" is not capitalized.
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
      getOOMKills: () => Promise<any>;
      getUsage: (name: string, resource: string) => Promise<any>;
      getAnalysis: (nodeName: string, timeInterval?: string, timeOfDeath?: string) => Promise<any>;
    };
  }
}
