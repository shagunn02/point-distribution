const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");

exports.claimPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || typeof user.name !== "string" || user.name.trim() === "") {
      return res.status(400).json({ error: "Invalid user or missing name" });
    }

    const claimedPoints = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += claimedPoints;

    const savedUser = await user.save();
    if (!savedUser || savedUser.totalPoints !== user.totalPoints) {
      return res
        .status(500)
        .json({ error: "Points not updated, claim aborted" });
    }

    const historyEntry = new ClaimHistory({
      userId: user._id,
      userName: user.name.trim(),
      claimedPoints,
    });

    await historyEntry.save();

    res.json({ user: savedUser, claimedPoints });
  } catch (err) {
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
    const logs = await ClaimHistory.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
