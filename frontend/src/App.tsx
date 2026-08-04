import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Product from "./pages/Product/Product";

import './App.css'
import MainLayout from './layouts/MainLayout'
import FloatingActionButton from "./components/FloatingActionButton/FloatingActionButton";

function App() {
 
  return (
    
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/products/:id" element={<Product/>}></Route>

        </Routes>
        <FloatingActionButton/>
      </MainLayout>
      
      
    
  )
}

export default App;
