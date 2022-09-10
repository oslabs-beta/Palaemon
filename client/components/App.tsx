import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import ClusterChart from './ClusterChart';
import Events from './Events';
import Graph from './Graph';

import '../stylesheets/style.scss';
import { ClusterChartProps, SvgInfo } from '../Types';

const App = (): JSX.Element => {
  const [pods, setPods]: any = useState([]);
  const [nodes, setNodes]: any = useState(['node1']);
  // const [deploys, setDeploys]: any = useState([]);
  // const [ns, setNs]: any = useState([]);
  // const [svc, setSvcs]: any = useState([]);
  // console.log('APP', window);
  const [test, setTest] = useState(['test']);

const fakedata2: SvgInfo = {
  name: 'string',
  usage: 1,
  request: 0.9,
  limit: 2,
  parent: 'string',
  namespace: 'string',
}

const fakedata: SvgInfo[] = [fakedata2, fakedata2]


  const gke: ClusterChartProps = {
    Clusters: fakedata,
    Nodes: fakedata,
    Pods: fakedata,
    Deployments: fakedata,
    click: string => console.log(string),
  };


  const [graphState, setGraphState] = useState([
    {
      tempPod: {
        times: ['a', 'b', 'c'],
        values: [1, 2, 3],
      },
    },
    {
      tempPod: {
        times: ['a', 'b', 'c'],
        values: [3, 2, 1],
      },
    },
  ]);

  useEffect(() => {
    doMeBabyOneMoreTime();
    // const doMe = setTimeout(doMeBabyOneMoreTime, 1000)
  }, test);

  const doMeBabyOneMoreTime = () => {
    // useEffect(() => {
    // console.log('I AM RUNNING BABY');
    window.api
      .getMemoryUsageByPods()
      .then((output: any) => {
        // console.log('type ', Array.isArray(output));
        // console.log('the Output ', output);
        setGraphState(output);
      })
      .catch((err: any) => {
        return { err: err };
      });
    setTimeout(doMeBabyOneMoreTime, 1000);
    // clearInterval(doMe)
    // }, test);
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
        <h1>Palaemon</h1>
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
            />
            {/* cluster chart */}
          </div>
          <div id="graph">
            <Graph data={graphState} />
          </div>
        </div>

        <div id="right-side">
          <Events />
        </div>
      </div>

      <footer className="puny">
        Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!
      </footer>
    </div>
  );
};

export default App;
