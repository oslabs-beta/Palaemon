import * as React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

// page containers for React Router
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import AnalysisPage from './AnalysisPage';

// import styles sheet here
import '../assets/stylesheets/style.scss';

const App = () => {
  const [analyze, setAnalyze] = React.useState<any[]>([]);

  // const getAnalyzeLength = () => {
  //   // console.OOMKilledPod('from our router', analyze)
  //   return analyze.length;
  // };

  // triggered on click of Analyze/Delete
  const handleAnalyzeUpdate = (newLogData: any) => {
    // check to see if the newLogData is identical to a prexisting object in the array
    // by comparing the object's podName and restartcount properties

    let included = false;
    for (let i = 0; i < analyze.length; i++) {
      if (
        analyze[i].podName === newLogData.podName &&
        analyze[i].restartcount === newLogData.restartcount
      ) {
        included = true;
      }
    }
    if (!included) {
      let newArr = analyze;
      console.log('this is newARR', newArr);
      newArr.push(newLogData);
      setAnalyze([...newArr]);
      console.log('here is analyze: ', analyze); // initial run empty, second run 1st element clicked on
    } else {
      let newArr = analyze;
      // analyze = 1 & 2
      let filtered = newArr.filter(
        OOMKilledPod =>
          OOMKilledPod.podName !== newLogData.podName &&
          OOMKilledPod.restartcount !== newLogData.restartcount
      );
      console.log('if this is 1 on first remove', filtered);
      setAnalyze([...filtered]); // 2
      console.log('END OF ELSE ', analyze);
    }

    // const copy = analyze;
    // const deleteMe = () => {
    //   const newCopy = copy.filter(
    //     pod =>
    //       pod.podName !== newLogData.podName &&
    //       pod.restartcount !== newLogData.restartcount
    //   );
    //   setAnalyze([newCopy]);
    // };
    // console.log('should be same', copy);
    // console.log('should be same', analyze);

    // if (copy.length) {
    //   for (let i = 0; i < copy.length; i++) {
    //     if (
    //       copy[i].podName === newLogData.podName &&
    //       copy[i].restartcount === newLogData.restartcount
    //     )
    //       return deleteMe();
    //     else copy.push(newLogData);
    //   }
    //   setAnalyze([...copy]);
    // } else {
    //   setAnalyze([...newLogData]);
    // }
  };

  return (
    <HashRouter>
      <nav id="sidebar">
        <Link to="/">
          <img id="logo" src="./assets/logo.png" alt="" />
        </Link>
        <ul id="sidebar-list">
          <li>
            <Link to="/">NAMESPACE</Link>
          </li>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          <li>
            <Link to="graphs">ANALYSIS</Link>
          </li>
        </ul>
      </nav>
      <main id="page">
        <div id="header">
          <Link to="/">
            <h1>PALAEMON</h1>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <HomePage
                handleAnalyzeUpdate={handleAnalyzeUpdate}
                analyze={analyze}
                setAnalyze={setAnalyze}
                // getAnalyzeLength={getAnalyzeLength}
              />
            }
          />
          <Route
            path="graphs"
            element={<AnalysisPage analyze={analyze} setAnalyze={setAnalyze} />}
          />
        </Routes>
        {/* <footer className="puny">
          Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!
        </footer> */}
      </main>
    </HashRouter>
  );
};

export default App;
