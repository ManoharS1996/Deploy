import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import Cart from './Cart';
import Footer from './Footer';
import Popup from './Popup';

function App() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);  // Hide popup after 2 seconds
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      {showPopup && <Popup />}
      <Routes>
        <Route path="/" element={<Homepage addToCart={addToCart} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
