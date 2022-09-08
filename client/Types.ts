export type test = string;

export type EventProps = {};

export type ClusterChart = {};

export type SvgInfo = {
  name: string[];
  usage: number[];
  request: number[];
  limit: number[];
};

export type ClusterChartProps = {
  Clusters: SvgInfo;
  Nodes: SvgInfo;
  Pods: SvgInfo;
  Deployments: SvgInfo;
  click: (input: string) => void;
};

export type ClusterChartCardProps = {
  title: string; // Cluster, or Pod, or Node, or Deployment
  name: string[]; // name of each individual square
  usage: number[];
  request: number[];
  limit: number[];
  click: (input: string) => void; // function to create the modal
};

export type EventCardProps = {
  key: string;
  eventObj: EventObject; 
};

export type EventObject = {
  namespace: string;
  lastSeen: string;
  severity: string;
  reason: string; 
  message: string;
  object: string; 
};
// const a: test = undefined
