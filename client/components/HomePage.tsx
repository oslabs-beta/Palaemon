import { useState, useEffect } from "react";
import ClusterChart from "./ClusterChart";
import Events from "./Events";
import Graph from "./Graph";
import DetailsModal from "./Modal";

import { ClusterChartProps, SvgInfo, ModalProps, Lulu } from "../Types";

const tempData: SvgInfo[] = [{
  name: "string",
  usage: 1,
  resource: 'hello',
  request: 0.9,
  limit: Math.random() + 1,
  parent: "string",
  namespace: "string",
}];

const initalClusterChartData: Lulu = {
  Clusters: tempData,
  Nodes: tempData,
  Pods: tempData,
  Deployments: tempData,
}

const HomePage = (props: any): JSX.Element => {
  const [pods, setPods]: any = useState([]);
  const [nodes, setNodes]: any = useState(["node1"]);
  const [portOpen, setPortOpen]: any = useState(false);
  const [clusterChartData, setClusterChartData] = useState<Lulu>(initalClusterChartData)
  
  // const updateShoppingCart = props.setShoppingCart;

  // Ways to clean up the modal:
  // the modal is split into two states. the modalState could probably accept the JSX component as a key value
  const [modalState, setModalState] = useState({
    open: false,
  });
  const [theModal, setTheModal] = useState(<p>help</p>);

  const openModal = (e: any, data: SvgInfo) => {
    console.log("I am modal and I am opening!");
    const position = {
      top: e.pageY.toString() + "px",
      left: e.pageX.toString() + "px",
    };
    const propData: ModalProps = {
      ...data,
      position: position,
      close: closeModal,
    };
    setTheModal(<DetailsModal {...propData} key={50} />);
    setModalState({
      open: true,
    });
  };

  const closeModal = (): void => {
    setModalState({
      open: false,
    });
  };
  
  const gke: ClusterChartProps = {
  ...clusterChartData,
    click: openModal,
    close: closeModal,
  };

  const renderData = async () => {
    const allTheInfo = await window.api.getAllInfo();
    setClusterChartData(allTheInfo);
  };

  useEffect(() => {
    renderData();
  }, []);

  return (
      <div id="contents">
        <div id="left-side">
          <div id="cluster-chart">
            <ClusterChart
              Clusters={gke.Clusters}
              Nodes={gke.Nodes}
              Pods={gke.Pods}
              Deployments={gke.Deployments}
              click={gke.click}
              close={gke.close}
            />
          </div>
          <div id="graph">
            <Graph />
          </div>
        </div>
        <div id="right-side">
          <Events updateShoppingCart={props.updateShoppingCart} getShoppingCartLength={props.getShoppingCartLength} />
        </div>
        {modalState.open && theModal}
      </div>
  );
};

export default HomePage;
