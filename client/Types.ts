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
  click: (input: ModalCard) => void;
};

export type ClusterChartCardProps = {
  title: string; // Cluster, or Pod, or Node, or Deployment
  name: string[]; // name of each individual square
  usage: number[];
  request: number[];
  limit: number[];
  click: (input: ModalCard) => void; // function to create the modal
};

export interface LogCardProps {
  key: string;
  eventObj?: EventObject;
  alertObj?: AlertObject;
  logType: string;
};

export type EventObject = {
  namespace: string;
  lastSeen: string;
  severity: string;
  reason: string;
  message: string;
  object: string;
};

export type AlertObject = {
  group: any;
  state: any;
  name: any;
  severity: any;
  description: any;
  summary: any;
  alerts: any;
};

export type ModalCard = {
  name: string;
  usage: number;
  request: number;
  limit: number;
};

export type GraphProps = {
  data: 
    {
      [podName:  string]: {
        times: string[];
        values: number[];
      };
    }[];
};
