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

// export type ClusterChartProps = {
//   Clusters: SvgInfo[];
//   Nodes: SvgInfo[];
//   Pods: SvgInfo[];
//   Deployments: SvgInfo[];
//   click: (input: ModalCard) => void;
// };

export interface ClusterChartProps extends Lulu {
  // click: (input: ModalCard) => void;
};

export type Lulu = {
  Clusters: SvgInfo[];
  Nodes: SvgInfo[];
  Pods: SvgInfo[];
  Deployments: SvgInfo[];
  click?: (input: ModalCard) => void;
};


export type ClusterChartCardProps = {
  title: string; // Cluster, or Pod, or Node, or Deployment
  data: SvgInfo[]
  click: (input: ModalCard) => void; // function to create the modal
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

export type AlertCardProps = {
  key: string;
  alertObj: AlertObject;
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
