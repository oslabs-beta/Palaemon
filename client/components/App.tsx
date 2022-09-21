import * as React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

// page containers for React Router
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import AnalysisPage from './AnalysisPage';

// import styles sheet here
import '../assets/stylesheets/style.scss';

const initData: any = [
  {
    Port9090isClosed: {
      times: ['a', 'b', 'c'],
      values: [1, 2, 3],
    },
  },
  {
    Port9090isClosedOpenIt: {
      times: ['a', 'b', 'c'],
      values: [3, 2, 1],
    },
  },
];

import Sidebar from './Sidebar';

const App = () => {
  const [analyzedPod, setAnalyzedPod]: any = React.useState({});
  const [resourceError, setResourceError]: any = React.useState('');
  const [analyzedData, setAnalyzedData]: any = React.useState({
    podMem: initData,
    podCPU: initData,
    nodeMem: initData,
    nodeCPU: initData,
    netRead: initData,
    netWrite: initData,
  });
  const [menuOpen, setMenuOpen]: any = React.useState(true);

  return (
    <HashRouter basename="/">
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="page">
        <div id="header">
          <Link to="/">
            <h1 id="company-name">PALAEMON</h1>
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
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
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
              />
            }
          />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
