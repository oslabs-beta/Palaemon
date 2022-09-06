import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import ClusterChart from './ClusterChart';
import Events from './Events';

import "../stylesheets/style.scss"

const App = (): JSX.Element => {
  return (
    <>
      <div id='navbar'>
        The navigation bar
        <img id="logo" src="../client/assets/logo.png" alt="" />
        
        <h1>Palaemon</h1>
      </div>

      <div id='contents'>
      <h2>A gentle, euthanization tool for OOM kubernetes pods</h2>
        <div id='left-side'>
          left side
          <div id='cluster-chart'>
            <ClusterChart />
            {/* cluster chart */}
          </div>
          <div id='graph'>
            graph
          </div>
        </div>
        
        <div id='right-side'>
          <Events />
          right side
        </div>
      </div>

      <div className='puny'>Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!</div>
    </>
  )
}

export default App