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
      getMemoryUsageByPods: () => Promise<any>;
    };
  }
}