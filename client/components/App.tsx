import HomePage from "./HomePage"
import * as React from 'react';
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Graph from "./Graph";

import { ShoppingCart } from "../Types";

import '../stylesheets/style.scss';
import AnalysisPage from "./AnalysisPage";

const App = () => {
  const [ shoppingCart, setShoppingCart] = React.useState<any[]>([])

  const getShoppingCartLength = () => {
    // console.log('from our router', shoppingCart)
    return shoppingCart.length;
  }

  const updateShoppingCart = (newLogData: any) => {
    // console.log('updateshoppingcart fun', newLogData)
    const newArray = shoppingCart;
    // console.log('newArray: ',newArray);
    newArray.push(newLogData);
    setShoppingCart(newArray);
  }

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
          <Route path="/" element={<HomePage updateShoppingCart={updateShoppingCart} getShoppingCartLength={getShoppingCartLength}/>} />
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