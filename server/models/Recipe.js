const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
    image: { type: String },
    tags: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);