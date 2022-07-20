import React,{useState} from 'react';
import DataBase from './components/dataBase';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductCategory from "./screens/ProductCategory"
function App() {
  const  [cantidadTotalCarro, setCantidadTotalCarro] = useState(0);

  setInterval(() => {
    var CartCurrent =JSON.parse(window.localStorage.orderFortm).carrito.cantidadTotal ? JSON.parse(window.localStorage.orderFortm).carrito.cantidadTotal : 0;
    setCantidadTotalCarro(CartCurrent);
  }, 1000);
 
  return (

    <body>

      <div className="grid-container">
        <header className="row">
          <div>
            <a href="/">
              <img width="200" src="https://images.squarespace-cdn.com/content/v1/569eb318dc5cb40e1bc88956/1604169562944-DFCPKGGR97125WC0MRHR/Correct+Logo.png?format=1500w" alt="logo"></img>
            </a>
          </div>
          <div>
            <a href="/cart">
              Cart {cantidadTotalCarro} 
            </a>
            <a href="/login">
              Login
            </a>
          </div>
        </header>
        <main>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<div id="data"><HomeScreen></HomeScreen></div>}></Route>
              <Route path="/product/:id" element={<ProductScreen></ProductScreen>}></Route>
              <Route path="/category/:type/page/:page" element={<ProductCategory></ProductCategory>}></Route>
            </Routes>
          </BrowserRouter>


        </main>
        <footer>
          All Rights Reserve @2022
        </footer>
      </div>
    </body>
  );
}

export default App;
