const express = require("express");
const router = express.Router();

const {
  createUser,
  claimPoints,
  getLeaderboard,
  getHistory,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");

router.get("/leaderboard", getLeaderboard);
router.get("/history", getHistory);
router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.patch("/:id/claim", claimPoints);

module.exports = router;
