const express = require("express");
const {
  submitFlag,
  addStage,
  getStageLeaderboard,
  getOverallLeaderboard,
  updateUserProgress,
  updateStageStartTime,
  toggleLeaderboardVisibility,
  getStageData
} = require("../controllers/stageController");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
// router.get("/", getAllStages); // Fetch all stages .. No Need
// router.get("/:stage", getStageByName); // Fetch details of a specific stage .. No Need
// router.get("/:stage/leaderboard", getStageLeaderboard); // ! Fetch leaderboard for a specific stage .. No Need
router.get("/leaderboard/overall", getOverallLeaderboard); // ! Fetch overall leaderboard

// Protected routes (Only authenticated users)
// router.post("/:stage/submit-keyword", submitKeyword); // ! Submit keyword to get the hashed flag
router.post("/submit-flag", submitFlag); // ? Submit the actual flag (hashed with ctf_id)
// router.post("/:userId/progress", updateUserProgress); // Update user progress (e.g., points, status).. We don't need this

// Admin routes (Require authentication & admin check)
router.post("/", addStage); // ! Admin adds a new stage .. No Need
router.post("/:stage/start-time", updateStageStartTime); // ? Update the start time for a stage
router.put("/toggle-leaderboard-visibility", toggleLeaderboardVisibility); // ? Toggle leaderboard visibility
router.get("/",getStageData)
module.exports = router;
