import React from 'react';
import './index.css'
import { Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Products from './components/Products/';
import AddProduct from './components/Products/AddProduct';
import EditProduct from './components/Products/EditProduct';
import Orders from './components/Orders/';
import AddOrder from './components/Orders/AddOrder';
import EditOrder from './components/Orders/EditOrder';
import Footer from './components/Footer'


function App() {
  return (
    <div>
      <div style={{minHeight: '92.4vh'}}>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/add" component={AddProduct} />
        <Route path="/products/edit/:id" component={EditProduct} />
        <Route exact path="/orders" component={Orders} />
        <Route path="/orders/add" component={AddOrder} />
        <Route path="/orders/edit/:id" component={EditOrder} />
      </div>
      <div style={{minHeight: '5vh'}}>
        <Route path="/" component={Footer} />
      </div>
    </div>
  );
}

export default App;
