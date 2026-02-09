import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Add more routes as we create page components */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
