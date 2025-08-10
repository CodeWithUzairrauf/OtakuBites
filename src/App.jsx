import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Styles/index.css'
import NarutoRainNavbar from './components/nav/Navbar'
import Home from "./pages/Home/Home"
import Recipes from "./pages/Recipes/recipes"
import Queue from "./pages/queue"
import Community from "./pages/Community/Community"
import RecipeDetail from './pages/Recipes/RecipeDetail';
import Join from './pages/Community/CommunityDetail';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NarutoRainNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/community" element={<Community />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  )
}

export default App
