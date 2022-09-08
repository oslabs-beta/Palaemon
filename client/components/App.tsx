import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import ClusterChart from './ClusterChart';
import Events from './Events';

import "../stylesheets/style.scss"

const App = (): JSX.Element => {
  return (
    <div id='app-container'>
      <div id='navbar'>
        <img id="logo" src="./assets/logo.png" alt="" />        
        <h1>Palaemon</h1>
      </div>

      <h3 id='tagline'>A gentle, euthanization tool for OOM kubernetes pods</h3>
      <div id='contents'>
        <div id='left-side'>
          left side
          <div id='cluster-chart'>
            {/* <ClusterChart /> */}
            {/* cluster chart */}
          </div>
          <div id='graph'>
            graph
          </div>
        </div>
        
        <div id='right-side'>
          <Events />
        </div>
      </div>

      <footer className='puny'>Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!</footer>
    </div>
  )
}

export default App