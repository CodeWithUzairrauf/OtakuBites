// controllers/commentController.js
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Create comment (or reply) on a post
exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentId } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
      parent: parentId || null,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for a post as a nested tree
exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).sort({ createdAt: 1 }).populate("author", "username").lean();

    // build tree
    const byId = new Map();
    comments.forEach(c => { c.children = []; byId.set(c._id.toString(), c); });
    const roots = [];
    comments.forEach(c => {
      if (c.parent) {
        const parent = byId.get(c.parent.toString());
        if (parent) parent.children.push(c);
        else roots.push(c);
      } else {
        roots.push(c);
      }
    });

    res.json(roots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete comment (author or community admin)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const post = await Post.findById(comment.post);
    const community = await require("../models/Community").findById(post.community);

    const isAuthor = comment.author.toString() === req.user._id.toString();
    const isCommunityAdmin = community && community.admin.toString() === req.user._id.toString();

    if (!isAuthor && !isCommunityAdmin) return res.status(403).json({ message: "Forbidden" });

    // delete comment and its replies (simple cascade)
    const deleteIds = [comment._id.toString()];
    // find direct children (one level). For deeper nesting you can iterate.
    const children = await Comment.find({ parent: comment._id });
    children.forEach(c => deleteIds.push(c._id.toString()));
    await Comment.deleteMany({ _id: { $in: deleteIds } });

    res.json({ message: "Comment (and children) deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};