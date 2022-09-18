import * as React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

// page containers for React Router
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import AnalysisPage from './AnalysisPage';

// import styles sheet here
import '../assets/stylesheets/style.scss';

const App = () => {
  const [analyzedPod, setAnalyzedPod]: any = React.useState({});

  return (
    <HashRouter>
      <nav id="sidebar">
        <Link to="/"><img id="logo" src="./assets/logo-hat.png" alt="" /></Link>
        <ul id="sidebar-list">
          <li><Link to="/">Namespace</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/analysis">Analysis</Link></li>
        </ul>
      </nav>
      <main id="page">
        <div id="header">
          <Link to="/"><h1>PALAEMON</h1></Link>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home"
            element={
              <HomePage
                analyzedPod={analyzedPod}
                setAnalyzedPod={setAnalyzedPod}/>}/>
          <Route path="/analysis"
            element={
              <AnalysisPage
                analyzedPod={analyzedPod}
                setAnalyzedPod={setAnalyzedPod}/>}/>
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
