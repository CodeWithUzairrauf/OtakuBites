const Community = require("../models/Community");

// Create Community
exports.createCommunity = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const existing = await Community.findOne({ name });
    if (existing) return res.status(400).json({ message: "Community name already taken" });

    const community = await Community.create({
      name,
      description,
      image,
      admin: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all communities
exports.getCommunities = async (req, res) => {
  try {
    console.log("Attempting to fetch communities from MongoDB...");
    const communities = await Community.find();
    console.log("Successfully fetched communities.", communities.length, "communities found.");
    res.json(communities);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ message: error.message });
  }
};

// Join community
exports.joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: "Community not found" });

    if (!community.members.includes(req.user._id)) {
      community.members.push(req.user._id);
      await community.save();
    }
    res.json({ message: "Joined successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Leave community
exports.leaveCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: "Community not found" });

    community.members = community.members.filter(
      (m) => m.toString() !== req.user._id.toString()
    );
    await community.save();
    res.json({ message: "Left successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};