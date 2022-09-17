import * as React from 'react';
import { HashRouter, Link, Route, Routes } from "react-router-dom";

// page containers for React Router
import HomePage from "./HomePage"
import LandingPage from "./LandingPage"
import AnalysisPage from "./AnalysisPage";

// import styles sheet here
import '../assets/stylesheets/style.scss';

const App = () => {
  const [shoppingCart, setShoppingCart] = React.useState<any[]>([])

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
          <li><Link to='/'>NAMESPACE</Link></li>
          <li><Link to='/home'>HOME</Link></li>
          <li><Link to="graphs">ANALYSIS</Link></li>
        </ul>
      </nav>
      <main id="page">
        <div id="header">
          <Link to='/'><h1>PALAEMON</h1></Link>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage updateShoppingCart={updateShoppingCart} getShoppingCartLength={getShoppingCartLength} />} />
          <Route path="graphs" element={<AnalysisPage />} />
        </Routes>
        <footer className="puny">
          Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!
        </footer>
      </main>
    </HashRouter>
  )

}

export default App