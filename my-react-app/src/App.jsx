// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail.jsx";
import Checkout from "./components/Checkout.jsx";
import OrderFullFill from "./components/OrderFullFill.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen w-full bg-gray-50 pt-16">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/Order" element={<OrderFullFill/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
