const Recipe = require("../models/Recipe");

// @desc    Add a new recipe
// @route   POST /api/recipes
// @access  Private
exports.addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, image, tags } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      image,
      tags,
      author: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author", "username email");
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("author", "username email");

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to update this recipe" });

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to delete this recipe" });

    // Use deleteOne instead of remove
    await recipe.deleteOne();

    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};