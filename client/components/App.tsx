import { useState, useEffect } from 'react';
import ClusterChart from './ClusterChart';
import Events from './Events';
import Graph from './Graph';
import DetailsModal from './Modal';

import '../stylesheets/style.scss';
import { ClusterChartProps, SvgInfo, ModalProps } from '../Types';

const App = (): JSX.Element => {
  const [pods, setPods]: any = useState([]);
  const [nodes, setNodes]: any = useState(['node1']);
  const [portOpen, setPortOpen]: any = useState(false);


  // Ways to clean up the modal:
  // the modal is split into two states. the modalState could probably accept the JSX component as a key value
  const [modalState, setModalState] = useState({
    open: false
  })
  const [theModal, setTheModal] = useState(<p>help</p>)


  const openModal = (e: any, data: SvgInfo) => {
    const position = {
      top: e.pageY.toString() + "px",
      left: e.pageX.toString() + "px"
    }
    const propData: ModalProps = { ...data, position: position, close: closeModal }
    // console.log('modal opened', propData)
    setTheModal(<DetailsModal {...propData} key={50} />)
    setModalState({
      open: true
    }
    );
  }

  const closeModal = (): void => {
    setModalState({
      open: false
    })
  }

  const fakedata2: SvgInfo = {
    name: 'string',
    usage: 1,
    request: 0.9,
    limit: Math.random() + 1,
    parent: 'string',
    namespace: 'string',
  }

  const fakedata: SvgInfo[] = [fakedata2, fakedata2]
  const gke: ClusterChartProps = {
    Clusters: fakedata,
    Nodes: fakedata,
    Pods: fakedata,
    Deployments: fakedata,
    click: openModal,
    close: closeModal
  };

  const renderData = async () => {
    const podsData = await window.api.getPods();
    const nodesData = await window.api.getNodes(); // an array of all the nodes
    //   const deploysData = await window.api.getDeployments();
    //   const svcData = await window.api.getServices();
    //   const nsData = await window.api.getNamespaces();

    setPods([...podsData]);
    console.log(podsData);
    setNodes([...nodesData]);
    //   setDeploys([...deploysData]);
    //   setNs([...nsData]);
    //   setSvcs([...svcData]);
  };

  useEffect(() => {
    renderData();
  }, []);

  return (
    <>
      {/* <h3 id="tagline">A gentle, euthanization tool for OOM kubernetes pods</h3> */}
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
          <Events />
        </div>
      </div>
      {modalState.open && theModal}
      <h1 onClick={closeModal} >close the modal</h1>
    </>
  );
};

export default App;
