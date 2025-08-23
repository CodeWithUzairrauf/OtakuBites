const express = require("express");
const router = express.Router();
const {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getRecipes);
router.get("/:id", getRecipeById);

// Protected routes
router.post("/", protect, addRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

module.exports = router;