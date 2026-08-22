import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import PaymentSuccess from "./pages/PaymentResult/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentResult/PaymentCancelled";

import CartModal from "./components/Modal/CartModal/CartModal";

import './App.css'
import MainLayout from './layouts/MainLayout'
import FloatingActionButton from "./components/FloatingActionButton/FloatingActionButton";
import { useState } from "react";

function App() {

  const [cartOpen, setCartOpen] = useState(false);
 
  return (
    
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path="/products/:id" element={<Product/>}></Route>
          <Route path="/checkout/success" element={<PaymentSuccess/>}/>
          <Route path="/checkout/cancel" element={<PaymentCancelled/>}/>
        </Routes>
        <FloatingActionButton
        onClick={() => setCartOpen(true)}
        />
        {cartOpen && (
          <CartModal
          onClose={() => setCartOpen(false)}
          />
        )}
        

      </MainLayout>
      
  );
}

export default App;
