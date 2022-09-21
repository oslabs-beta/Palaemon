import * as React from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

// page containers for React Router
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import AnalysisPage from "./AnalysisPage";

// import styles sheet here
import "../assets/stylesheets/style.scss";

const initData: any = [
  {
    Port9090isClosed: {
      times: ["a", "b", "c"],
      values: [1, 2, 3],
    },
  },
  {
    Port9090isClosedOpenIt: {
      times: ["a", "b", "c"],
      values: [3, 2, 1],
    },
  },
];



const App = () => {
  const [analyzedPod, setAnalyzedPod]: any = React.useState({});
  const [resourceError, setResourceError]: any = React.useState("");
  const [analyzedData, setAnalyzedData]: any = React.useState({
    podMem: initData,
    podCPU: initData,
    nodeMem: initData,
    nodeCPU: initData,
    netRead: initData,
    netWrite: initData,
  });

  return (
    <HashRouter basename="/">
      <nav id="sidebar">
        <Link to="">
          <img id="logo" src="./assets/logo-hat.png" alt="" />
        </Link>
        <ul id="sidebar-list">
          <li>
            <Link to="/" id='link-namespace'>
              <div className="sidebar-page-container">
                <img className="sidebar-icon" src="./assets/ns-icon.png" />
                <span>Namespace</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/home" id='link-dashboard'>
              <div className="sidebar-page-container">
                <img
                  className="sidebar-icon"
                  src="./assets/dashboard-icon.png"
                />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/analysis" id='link-analysis'>
              <div className="sidebar-page-container">
                <img
                  className="sidebar-icon"
                  src="./assets/analysis-icon.png"
                />
                <span>Analysis</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <main id="page">
        <div id="header">
          <Link to="/">
            <h1 id='company-name'>PALAEMON</h1>
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                setResourceError={setResourceError}
                resourceError={resourceError}
              />
            }
          />
          <Route
            path="/home"
            element={
              <HomePage
                analyzedPod={analyzedPod}
                setAnalyzedPod={setAnalyzedPod}
                setResourceError={setResourceError}
                setAnalyzedData={setAnalyzedData}
              />
            }
          />
          <Route
            path="/analysis"
            element={
              <AnalysisPage
                analyzedPod={analyzedPod}
                setAnalyzedPod={setAnalyzedPod}
                analyzedData={analyzedData}
                setAnalyzedData={setAnalyzedData}
                clusterChartData={[]}
              />
            }
          />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
