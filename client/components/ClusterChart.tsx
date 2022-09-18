import { useState } from 'react';
import { ClusterChartProps } from '../Types';
import ClusterChartCard from './ClusterChartCard';

const ClusterChart = (props: ClusterChartProps): JSX.Element => {


  const names: ["Nodes", "Pods"] = ["Nodes", "Pods"]
  const clusterCards: any = [];
  
  // async function to update each card's usage with query to prom via main process
  const getData = async (name: string, resource: string, obj: any) => {
    try {

      const usageData = await window.api.getUsage(name, resource);
      if (usageData) obj.usage = usageData[0]
    } catch(err) {
      console.log('i am error', err)
    }
  }

  if (props.click)
  for (let i = 0; i < names.length; i++) {
      clusterCards.push(
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

    if (clusterCards.length > 0) {
      for (let i = 0; i < clusterCards.length; i++) {
        for (let j = 0; j < clusterCards[i].props.data.length; j++) {
          const card = clusterCards[i].props.data[j]
          // excluding the temp cards in initial state
          if (card.resource !== 'hello') {
            getData(card.name, card.resource, card);
          }
        }
      }
    }

    // lenny original code
    // for (let i = 0; i < clusterCards.length; i++) {
    //   console.log('cluster cards at i', clusterCards[i]);
    //   console.log(clusterCards[i].props.data[0])
    // }
  // const names: ["Clusters", "Nodes", "Pods", "Deployments"] = ["Clusters", "Nodes", "Pods", "Deployments"];
  // // const names: string[] = ["Clusters", "Nodes", "Pods", "Deployments",'a','a'];
  // const clusterCards: JSX.Element[] = [];

  // if (props.click)
  // for (let i = 0; i < 4; i++) {
  //   // set the last el (obj) of each array to the most recent mem/cpu usage query
  //     //updates value for clusterchartcard status indicator
  //   console.log('HERE IS PROPS BEFORE ADJUST', props[names[i]])
  //   props[names[i]][props[names[i]].length-1].usage = 50
  //   // console.log('HERE IS PROPS AFTER ADJUST', props[names[i]])
  //     clusterCards.push(
  //       <ClusterChartCard
  //         title={names[i]}
  //         // function to check if last data element.. then add usage
  //         data={props[names[i]]}
  //         click={props.click}
  //         close={props.close}
  //         key={10 + i}
  //       />
  //     );
  //   }

  return (
    <div id="cluster-chart">
      {clusterCards}
    </div>
    )
};

export default ClusterChart;
