import { ClusterChartProps } from "../Types";
import ClusterChartCard from "./ClusterChartCard";

const ClusterChart = (props: ClusterChartProps): JSX.Element => {



  const names: ["Clusters", "Nodes", "Pods", "Deployments"] = ["Clusters", "Nodes", "Pods", "Deployments"];
  // const names: ["Clusters", "Nodes", "Pods", "Deployments"] = ["Clusters", "Nodes", "Pods", "Deployments"];
  // const names: string[] = ["Clusters", "Nodes", "Pods", "Deployments",'a','a'];
  const clusterCards: JSX.Element[] = [];
  if (props.click)
    for (let i = 0; i < 4; i++) {
      clusterCards.push(
        <ClusterChartCard
          title={names[i]}
          data={props[names[i]]}
          click={props.click}
          close={props.close}
          key={10 + i}
        />
      );
    }

  return (
    <div id="cluster-chart">
      {clusterCards}
    </div>
    )
};

export default ClusterChart;