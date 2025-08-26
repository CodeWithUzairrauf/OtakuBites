const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      voteType: { type: String, enum: ["up", "down"] },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);