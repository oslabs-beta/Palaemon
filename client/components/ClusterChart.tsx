import { useState } from 'react';
import { ClusterChartProps } from '../Types';
import ClusterChartCard from './ClusterChartCard';

const ClusterChart = (props: ClusterChartProps): JSX.Element => {
  const [clusterCards, setClusterCards]: any = useState([]);
  const names: ['Pods', 'Nodes', 'Clusters'] = ['Pods', 'Nodes', 'Clusters'];
  // const names: string[] = ["Clusters", "Nodes", "Pods", "Deployments",'a','a'];
  const cards: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    const generateCard = () => {
      cards.push(
        <ClusterChartCard
          title={names[i]}
          data={props[names[i]]}
          click={props.click}
          close={props.close}
          key={10 + i}
        />
      );
    };

    if (names[i] === 'Pods') {
      cards.push(
        <ClusterChartCard
          title={names[i]}
          data={props[names[i]]}
          click={props.click}
          close={props.close}
          key={10 + i}
        />
      );
    } else generateCard();
  }

  return <div id="cluster-chart">{cards}</div>;
};

export default ClusterChart;
