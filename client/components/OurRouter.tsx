import HomePage from "./App"
import * as React from 'react';
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Graph from "./Graph";

import '../stylesheets/style.scss';
import AnalysisPage from "./AppTwo";

const App = () => {

  return (
    <HashRouter>
      <nav id="sidebar">
        <Link to='/'><img id="logo" src="./assets/logo.png" alt="" /></Link>
        <ul id="sidebar-list">

          <li>NAMESPACE</li>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to="graphs">ANALYSIS</Link></li>
        </ul>
      </nav>
      <main id="page">
        <div id="header">
          {/* <Link to="/">Ho</Link>  */}
          <Link to='/'><h1>PALAEMON</h1></Link>
        </div>
        {/* <App /> */}


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="graphs" element={<AnalysisPage />} />
          {/* <Route exact path="/one" component={Stand} /> */}
          {/* <Route exact path="/two" component={Sit} /> */}
        </Routes>
        <footer className="puny">
          Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!
        </footer>
      </main>
    </HashRouter>
  )

}

export default App