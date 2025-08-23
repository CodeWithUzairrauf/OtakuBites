import React, { useState } from 'react';
import './Styles/index.css'
import Navbar from './components/nav/Navbar'
import Home from "./pages/Home/Home"
import Recipes from "./pages/Recipes/recipes"
import Queue from "./pages/queue"
import Community from "./pages/Community/Community"
import RecipeDetail from './pages/Recipes/RecipeDetail';
import CommunitySignup from './pages/Community/CommunitySignup';
import Signup from './components/signup/signup';
import Login from './components/Login/login';
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleSignup = (newUser) => {
    setUsers([...users, newUser]);
    navigate('/login');
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/signup" element={<CommunitySignup />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/signup" element={<Signup onSignupSuccess={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </>
  )
}

export default App