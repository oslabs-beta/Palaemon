import { ClusterChartProps } from '../Types';
import ClusterChartCard from './ClusterChartCard';

const ClusterChart = (props: ClusterChartProps): JSX.Element => {


    const names: ["Pods", "Nodes"] = ["Pods", "Nodes"]
    const clusterCards: any = [];
    
    // async function to update each card's usage with query to prom via main process
    const getData = async (name: string, resource: string, obj: any) => {
      try {

        const usageData = await window.api.getUsage(name, resource);
        if (usageData) obj.usage = usageData[0]
      } catch(err) {
        console.log('Error', err)
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

  return (
    <div id="cluster-chart">
      {clusterCards}
    </div>
    )
};

export default ClusterChart;
