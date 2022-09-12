import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
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
  // const [deploys, setDeploys]: any = useState([]);
  // const [ns, setNs]: any = useState([]);
  // const [svc, setSvcs]: any = useState([]);
  // console.log('APP', window);
  const [portOpen, setPortOpen]: any = useState(false);

  const modalStateInit = {
    open: false
  }

  // Ways to clean up the modal:
  // the modal is split into two states. the modalState could probably accept the JSX component as a key value
  const [modalState, setModalState] = React.useState(modalStateInit)
  const [theModal, setTheModal] = React.useState(<p>help</p>)


  const openModal = (e: any, data: SvgInfo) => {

    const position = {
      top: e.pageY.toString() + "px",
      left: e.pageX.toString() + "px"
    }
    const propData: ModalProps = { ...data, position: position, close: closeModal }
    console.log('modal opened', propData)


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
  // click: string => console.log('clickfunc', string),


  const [graphState, setGraphState] = useState([
    {
      Port9090isClosed: {
        times: ['a', 'b', 'c'],
        values: [1, 2, 3],
      },
    },
    {
      Port9090isClosed: {
        times: ['a', 'b', 'c'],
        values: [3, 2, 1],
      },
    },
  ]);
  if (!portOpen)
    fetch('http://localhost:9090/')
      .then((response) => {
        console.log('status code', response.status)
        if (response.status === 200) {
          setPortOpen(true)
        } else {

        }
      })

  useEffect(() => {
    doMeBabyOneMoreTime();
  }, [portOpen]);

  const doMeBabyOneMoreTime = () => {
    if (portOpen) {
      window.api
        .getMemoryUsageByPods()
        .then((output: any) => {
          // console.log('type ', Array.isArray(output));
          // console.log('the Output ', output);
          if (!output.err) setGraphState(output);
        })
        .catch((err: any) => {
          return { err: err };
        });
      setTimeout(doMeBabyOneMoreTime, 1000);
    }
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
    <div id="app-container">
      <div id="navbar">
        <img id="logo" src="./assets/logo.png" alt="" />
        <h1>PALAEMON</h1>
      </div>

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
            <Graph data={graphState} />
          </div>
        </div>
        <div id="right-side">
          <Events />
        </div>
      </div>
      {modalState.open && theModal}
      <h1 onClick={closeModal} >close the modal</h1>
      <footer className="puny">
        Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!
      </footer>
    </div>
  );
};

export default App;
