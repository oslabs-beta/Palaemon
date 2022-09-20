import * as React from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

// page containers for React Router
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import AnalysisPage from './AnalysisPage';

// import styles sheet here
import '../assets/stylesheets/style.scss';
import Sidebar from './Sidebar';

const App = () => {
  const [analyzedPod, setAnalyzedPod]: any = React.useState({});
  const [menuOpen, setMenuOpen]: any = React.useState(true);

  return (
    <HashRouter basename="/">
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
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
                analyzedPod={analyzedPod}
                setAnalyzedPod={setAnalyzedPod}
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
              />
            }
          />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
