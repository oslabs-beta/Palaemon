export type test = string;

export type EventProps = {};

export type ClusterChart = {};

export type SvgInfo = {
  // for properties that dont exist in pod, node, cluster or deployment give it a 0 for num or '' for string
  name: string // name of pod, node, or cluster, or deployment
  usage: number // pods: memory used in bytes -- node: "memory requested" field from k8 (kibibytes)
  request: number // pods: request memory in bytes -- node: 0 (node does not have same type of "request" memory as pods)
  limit: number // pods: limit memory in bytes -- node: "memory allocatable" field from k8 (kibibytes)
  parent: string // pod: node name -- node: cluster name
  namespace: string // the namespace of a pod, or n/a for node
};

export class SvgInfoObj implements SvgInfo {
  constructor(){
    // set default values for each prop
    // number defaults are set to 1 (instead of) to avoid divide by 0 issues
    this.name = '';
    this.usage = 1;
    this.request = 1;
    this.limit = 1;
    this.parent = '';
    this.namespace = '';
  }

  name: string; // name of pod, node, or cluster, or deployment
  usage: number; // pods: memory used in bytes -- node: "memory requested" field from k8 (kibibytes)
  request: number; // pods: request memory in bytes -- node: 0 (node does not have same type of "request" memory as pods)
  limit: number; // pods: limit memory in bytes -- node: "memory allocatable" field from k8 (kibibytes)
  parent: string; // pod: node name -- node: cluster name
  namespace: string; 
}

export interface ModalProps extends SvgInfo {
  position: {left: string, top: string}
  close: () => void;
}

// export type ClusterChartProps = {
//   Clusters: SvgInfo[];
//   Nodes: SvgInfo[];
//   Pods: SvgInfo[];
//   Deployments: SvgInfo[];
//   click: (input: ModalCard) => void;
// };

export interface ClusterChartProps extends Lulu {
  close: () => void;
};

export type Lulu = {
  Clusters: SvgInfo[];
  Nodes: SvgInfo[];
  Pods: SvgInfo[];
  Deployments: SvgInfo[];
  click?: (e: any, input: SvgInfo) => void;
};


export type ClusterChartCardProps = {
  title: string; // Cluster, or Pod, or Node, or Deployment
  data: SvgInfo[]
  click: (e: any, input: SvgInfo) => void;
  close: () => void;
};

export interface LogCardProps {
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
  data: {
    [podName: string]: {
      times: string[];
      values: number[];
    };
  }[];
};
