import * as React from "react";
import { forEach } from "../../webpack.production";
import { ClusterChartProps, SvgInfo } from "../Types";
import ClusterChartCard from "./ClusterChartCard";

const ClusterChart = (props: ClusterChartProps): JSX.Element => {

  const modalStateInit = {
    open: false,
    position: { top: 0, left: 0 },
  }

  const [modalState, setModalState] = React.useState(modalStateInit)

  const openModal = (position: { top: number, left: number }): void => {
    setModalState({
      open: true,
      position: position
    }
    );
  }

  const closeModal = (): void => {
    setModalState({
      open: false,
      position: { top: 0, left: 0 }
    })
  }


  const names: ["Clusters", "Nodes", "Pods", "Deployments"] = ["Clusters", "Nodes", "Pods", "Deployments"];
  // const names: string[] = ["Clusters", "Nodes", "Pods", "Deployments",'a'];
  const clusterCards: JSX.Element[] = [];
  if (props.click)
    for (let i = 0; i < 4; i++) {
      clusterCards.push(
        <ClusterChartCard
          title={names[i]}
          data={props[names[i]]}
          click={props.click}
          key={10 + i}
        />
      );
    }

  return (
    <div id="cluster-chart">
      {clusterCards}
      {/* {modalState.open &&
          <Modal
            type={this.state.modalState.type}
            position={this.state.modalState.position}
            id={this.state.modalState.id}
            closeModal={this.closeModal}
          />
        } */}
    </div>
    )
};

export default ClusterChart;