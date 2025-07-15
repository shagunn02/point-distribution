const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.claimPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const points = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({
      userId: user._id,
      points,
    });
    await history.save();

    res.status(200).json({ user, claimedPoints: points });
  } catch (err) {
    console.error("Claim Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find().populate("userId");
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
