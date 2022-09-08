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
