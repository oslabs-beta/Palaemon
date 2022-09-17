import HomePage from './HomePage';
import * as React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Graph from './Graph';

import { AnalyzeCount } from '../Types';

import '../stylesheets/style.scss';
import AnalysisPage from './AnalysisPage';

const App = () => {
  const [analyze, setAnalyze] = React.useState<any[]>([]);

  const getAnalyzeLength = () => {
    // console.log('from our router', analyze)
    return analyze.length;
  };

  const handleAnalyzeUpdate = (newLogData: any) => {
    console.log('STATE ARRAY', analyze);
    // console.log('updateshoppingcart fun', newLogData)
    let newArray = analyze;
    // console.log('newArray: ',newArray);
    if (!newArray.includes(newLogData)) {
      newArray.push(newLogData);
      console.log('FILTERED', newArray);
      setAnalyze([...newArray]);
    } else {
      newArray = newArray.filter(log => {
        if (
          log.podName !== newLogData.podName &&
          log.restartcount !== newLogData.restartCount
        )
          return log;
      });
      console.log('FILTERED', newArray);
      setAnalyze([...newArray]);
    }
  };

  return (
    <HashRouter>
      <nav id="sidebar">
        <Link to="/">
          <img id="logo" src="./assets/logo.png" alt="" />
        </Link>
        <ul id="sidebar-list">
          <li>NAMESPACE</li>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="graphs">ANALYSIS</Link>
          </li>
        </ul>
      </nav>
      <main id="page">
        <div id="header">
          {/* <Link to="/">Ho</Link>  */}
          <Link to="/">
            <h1>PALAEMON</h1>
          </Link>
        </div>
        {/* <App /> */}

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                handleAnalyzeUpdate={handleAnalyzeUpdate}
                analyze={analyze}
                setAnalyze={setAnalyze}
                // getAnalyzeLength={getAnalyzeLength}
              />
            }
          />
          <Route path="graphs" element={<AnalysisPage />} />
          {/* <Route exact path="/one" component={Stand} /> */}
          {/* <Route exact path="/two" component={Sit} /> */}
        </Routes>
        {/* <footer className="puny">
          Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!
        </footer> */}
      </main>
    </HashRouter>
  );
};

export default App;
