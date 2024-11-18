import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Cart from './Components/Cart';
import Products from './Components/Products';

function App() {
    const loadCartItems = () => {
    
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      console.log('Cart loaded from localStorage:', JSON.parse(savedCart));
      return JSON.parse(savedCart);
    }
    return []; 
  };

  const [cartItems, setCartItems] = useState(loadCartItems());

  useEffect(() => {
    if (cartItems.length > 0) {
      console.log('Saving cart to localStorage:', cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);



  return (
    <Router>
        <nav className='bg-gray-500 text-white text-md'>
          <ul className='flex justify-between gap-6 pt-5 pb-5 pr-10 pl-10'>
            <li className='text-xl font-bold p-2'><Link to="/products">Products</Link></li>
            <li className='bg-yellow-400 font-bold text-xl p-2 rounded-lg hover:bg-yellow-500'><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}></Route>
          <Route path="/products" element={<Products cartItems={cartItems} setCartItems={setCartItems} />}></Route>
        </Routes>
    </Router>
  )
}

export default App
