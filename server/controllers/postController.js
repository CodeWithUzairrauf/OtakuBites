// controllers/postController.js
const Post = require("../models/Post");
const Community = require("../models/Community");
const mongoose = require("mongoose");

// Create a post in a community (requires membership)
exports.createPost = async (req, res) => {
  try {
    const { communityId, title, content } = req.body; // <-- read from body
    if (!title) return res.status(400).json({ message: "Title required" });
    if (!communityId) return res.status(400).json({ message: "communityId required" });

    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: "Community not found" });

    // must be member to post
    if (!community.members.map(String).includes(req.user._id.toString())) {
      return res.status(403).json({ message: "Join the community to post" });
    }

    const post = await Post.create({
      community: communityId,
      author: req.user._id,
      title,
      content,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List posts in a community with pagination & simple sort (new | top)
exports.listPosts = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { page = 1, limit = 10, sort = "new" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    if (sort === "top") {
      // aggregate score = up - down
      const pipeline = [
        { $match: { community: new mongoose.Types.ObjectId(communityId) } },
        { $addFields: { upCount: { $size: { $ifNull: ["$votes", []] } } } },
        // Note: we track voteType per entry; compute counts properly:
        {
          $addFields: {
            upCount: {
              $size: {
                $filter: { input: "$votes", as: "v", cond: { $eq: ["$$v.voteType", "up"] } }
              }
            },
            downCount: {
              $size: {
                $filter: { input: "$votes", as: "v", cond: { $eq: ["$$v.voteType", "down"] } }
              }
            }
          }
        },
        { $addFields: { score: { $subtract: ["$upCount", "$downCount"] } } },
        { $sort: { score: -1, createdAt: -1 } },
        { $skip: skip },
        { $limit: parseInt(limit) },
      ];
      const docs = await Post.aggregate(pipeline);
      // populate author and community fields
      const populated = await Post.populate(docs, [{ path: "author", select: "username" }, { path: "community", select: "name" }]);
      return res.json({ items: populated, page: parseInt(page), limit: parseInt(limit) });
    }

    const items = await Post.find({ community: communityId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "username")
      .populate("community", "name");

    res.json({ items, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single post (with author & community)
exports.getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("author", "username").populate("community", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post (author or community admin)
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const community = await Community.findById(post.community);
    const isAuthor = post.author.toString() === req.user._id.toString();
    const isCommunityAdmin = community && community.admin.toString() === req.user._id.toString();

    if (!isAuthor && !isCommunityAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Vote (up/down/undo) on a post. value: 1 (up), -1 (down), 0 (remove)
exports.votePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { value } = req.body; // 1 | -1 | 0
    if (![1, -1, 0].includes(value)) return res.status(400).json({ message: "Invalid vote" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Remove existing vote by user
    post.votes = post.votes.filter(v => v.user.toString() !== req.user._id.toString());

    if (value === 1) post.votes.push({ user: req.user._id, voteType: "up" });
    if (value === -1) post.votes.push({ user: req.user._id, voteType: "down" });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};