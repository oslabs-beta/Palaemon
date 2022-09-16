import App from "./App"
import * as React from 'react';
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Graph from "./Graph";

import { ShoppingCart } from "../Types";

import '../stylesheets/style.scss';
import AppTwo from "./AppTwo";

const OurRouter = () => {
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
      <div id="app-container">
        {/* <h1 onClick={()=>updateShoppingCart(3)}>test click update</h1> */}
        {/* <h1 onClick={()=>getShoppingCart()}>test click get</h1> */}
        <div id="navbar">
          <Link to='/'><img id="logo" src="./assets/logo.png" alt="" /></Link>
          <Link to="graphs">Graphs</Link>
          {/* <Link to="/">Ho</Link>  */}
          <Link to='/'><h1>PALAEMON</h1></Link>
        </div>
        {/* <App /> */}


        <Routes>
          <Route path="/" element={<App updateShoppingCart={updateShoppingCart} getShoppingCartLength={getShoppingCartLength}/>} />
          <Route path="graphs" element={<AppTwo />} />
          {/* <Route exact path="/one" component={Stand} /> */}
          {/* <Route exact path="/two" component={Sit} /> */}
        </Routes>
        <footer className="puny">
          Hello puny kubernetes pods! Tremble in front of the almighty Palaemon!
        </footer>
      </div>
    </HashRouter>
  )

}

export default OurRouter

/*
const App = (props)=> {
 
    return (
      <HashRouter>
      <div className="App">
        <div className="menu">
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/one"><h2>Stand</h2></Link>
          <Link to="/two"><h2>Sit</h2></Link>
        </div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/one" component={Stand}/>
          <Route exact path="/two" component={Sit}/>
        </Switch>     
      </div>
      </HashRouter>    
    );
  }
  
  export default App;
  */
