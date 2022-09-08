import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
// import ClusterChart from './ClusterChart';
import Events from './Events';
import Graph from './Graph';

import '../stylesheets/style.scss';

const App = (): JSX.Element => {
  const [pods, setPods]: any = useState([]);
  const [nodes, setNodes]: any = useState([]);
  const [deploys, setDeploys]: any = useState([]);
  const [ns, setNs]: any = useState([]);
  const [svc, setSvcs]: any = useState([]);
  console.log('APP', window);

  // convert the queried data from k8 into a cleaner format

  const renderData = async () => {
    const podsData = await window.api.getPods();
    const nodesData = await window.api.getNodes();
    const deploysData = await window.api.getDeployments();
    const svcData = await window.api.getServices();
    const nsData = await window.api.getNamespaces();

    setPods([...podsData]);
    setNodes([...nodesData]);
    setDeploys([...deploysData]);
    setNs([...nsData]);
    setSvcs([...svcData]);
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

      <h3 id="tagline">A gentle, euthanization tool for OOM kubernetes pods</h3>
      <div id="contents">
        <div id="left-side">
          <div id="cluster-chart">
            {`PODS: ${JSON.stringify(pods)}`}
            <br />
            {`NODES: ${JSON.stringify(nodes)}`}
            <br />
            {`NS: ${JSON.stringify(ns)}`}
            <br />
            {`DEPLOYS: ${JSON.stringify(deploys)}`}
            <br />
            {`SERVICES: ${JSON.stringify(svc)}`}
          </div>
          <div id="graph">
              <Graph />
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
