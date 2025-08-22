import './Styles/index.css'
import Navbar from './components/nav/Navbar'
import Home from "./pages/Home/Home"
import Recipes from "./pages/Recipes/recipes"
import Queue from "./pages/queue"
import Community from "./pages/Community/Community"
import RecipeDetail from './pages/Recipes/RecipeDetail';
import CommunitySignup from './pages/Community/CommunitySignup';
import CommunityLogin from './pages/Community/CommunityLogin';

import {
  Routes,
  Route,
} from "react-router-dom";


function App() {

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/community" element={<Community />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/community/signup" element={<CommunitySignup />} />
        <Route path="/community/login" element={<CommunityLogin />} />
      </Routes>
    </>
  )
}

export default App
