import { ClusterChartProps } from "../Types";
import ClusterChartCard from "./ClusterChartCard";

const ClusterChart = (props: ClusterChartProps): JSX.Element => {



  const names: ["Clusters", "Nodes", "Pods", "Deployments"] = ["Clusters", "Nodes", "Pods", "Deployments"];
  // const names: string[] = ["Clusters", "Nodes", "Pods", "Deployments",'a','a'];
  const clusterCards: JSX.Element[] = [];

  // invoke add  usage function to element on props[names[i]][length-1]
  if (props.click)
    for (let i = 0; i < 4; i++) {
      clusterCards.push(
        <ClusterChartCard
          title={names[i]}
          // function to check if last data element.. then add usage
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