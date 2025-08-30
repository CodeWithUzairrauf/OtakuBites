import React, { useState, useEffect } from 'react';
import './Styles/index.css'
import Navbar from './components/nav/Navbar'
import Home from "./pages/Home/Home"
import Recipes from "./pages/Recipes/recipes"
import RecipeDetails from "./pages/Recipes/ViewRecipe";
import AddRecipe from './pages/Recipes/AddRecipe';
import Queue from "./pages/queue"
import Community from "./pages/Community/Community"
import Signup from './components/signup/signup';
import Login from './components/Login/login';
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/community" element={<Community username={username} />} />
        <Route path="/recipes/add" element={<AddRecipe />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </>
  )
}

export default App