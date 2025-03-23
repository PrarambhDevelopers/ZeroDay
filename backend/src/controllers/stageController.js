const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Stage = require("../models/Stage");
const moment = require("moment-timezone");
const crypto = require("crypto");
require("dotenv").config();
// Helper function to hash the flag with ctf_id and generate a unique salt each time
const hashFlag = (flag, ctf_id) => {
  // Combine the ctf_id and the flag
  const data = flag + ctf_id;

  // Create a SHA-256 hash of the combined data
  const hash = crypto.createHash("sha256").update(data).digest("hex");

  // Return the first 6 characters of the hash to ensure it is always of length 6
  return hash.slice(0, 6);
};

// ? Flags for each level (You can change these as needed)
const flags = {
  level1: { flag: "flag123", points: 10 },
  level2: { flag: "flag456", points: 20 },
  level3: { flag: "flag789", points: 30 },
  level4: { flag: "flag101", points: 40 },
  level5: { flag: "flag112", points: 50 },
};

// ! @desc Add a new stage
// ! @route POST /api/stages
const addStage = async (req, res) => {
  try {
    const { start_time } = req.body;

    const stage = await Stage.findOne();
    if (stage) return res.status(400).json({ message: "Stage already exists" });
    const newStage = new Stage({ stage, pairs });
    await newStage.save();

    res.status(201).json({ message: "Stage added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Submit the actual flag
// ! @route POST /api/stages/:stage/submit-flag
// Flag submission function
const submitFlag = async (req, res) => {
  try {
    const { ctf_id, level, submittedFlag } = req.body;

    if (!level || !flags[level]) {
      return res.status(400).json({ message: "Invalid level provided" });
    }

    // Find the user based on ctf_id
    const user = await User.findOne({ ctf_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the competition start time from the database
    const stage = await Stage.findOne();
    if (!stage || !stage.start_time) {
      return res
        .status(400)
        .json({ message: "Competition start time not set" });
    }

    // Convert start time to IST
    const competitionStartTime = moment(stage.start_time).tz("Asia/Kolkata");

    // Get the current time in IST
    const currentTime = moment().tz("Asia/Kolkata");

    // console.log("Current Time: ", currentTime.format());
    // console.log("Competition Start Time: ", competitionStartTime.format());

    // Ensure the game has started
    if (currentTime.isBefore(competitionStartTime)) {
      return res.status(400).json({ message: "Game has not started yet" });
    }

    // Check if the submitted flag is correct
    if (flags[level].flag !== submittedFlag) {
      return res.status(400).json({ message: "Incorrect flag" });
    }

    // Ensure the flag is not submitted multiple times
    if (user.submitted_flags?.includes(submittedFlag)) {
      return res.status(400).json({ message: "Flag already submitted" });
    }

    // Award points
    user.points += flags[level].points;

    // Calculate time taken in seconds
    const timeDifference = currentTime.diff(competitionStartTime, "seconds");

    // Ensure time_duration[level] is initialized
    if (!user.time_duration[level]) {
      user.time_duration[level] = 0;
    }

    // Add the time difference to the user's total time
    user.time_duration[level] += timeDifference;

    // Update last submission time
    user.last_submission_time[level] = currentTime.toDate();

    // Add the flag to the submitted_flags list
    if (!user.submitted_flags) {
      user.submitted_flags = [];
    }
    user.submitted_flags.push(submittedFlag);

    // Save user data
    await user.save();

    res.json({
      message: "Flag submitted successfully",
      points: user.points,
      timeTaken: timeDifference, // Return time taken in seconds
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Get stage leaderboard
// ! @route GET /api/stages/:stage/leaderboard
const getStageLeaderboard = async (req, res) => {
  try {
    const { stage } = req.params;
    const users = await User.find({
      [`points.${stage}`]: { $gt: 0 },
      status: { $ne: "eliminated" },
    })
      .select("ctf_id points time_duration")
      .sort({ [`points.${stage}`]: -1, [`time_duration.${stage}`]: 1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Get overall leaderboard
// ! @route GET /api/leaderboard/overall
const getOverallLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("ctf_id points time_duration")
      .sort({ "points.total": -1, "time_duration.total": 1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Update user progress (Mark stage completed)
// ! @route POST /api/users/:id/progress
const updateUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { stage } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.stages_completed.includes(stage))
      user.stages_completed.push(stage);

    await user.save();
    res.json({ message: "Stage marked as completed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update the start time for a stage (Admin only)
// ! @desc Update the start time for a stage
// ! @route POST /api/stages/:stage/start-time
const updateStageStartTime = async (req, res) => {
  try {
    const { newStartTime } = req.body; // Expect new start time in Date format

    // Convert given time to UTC before storing
    const utcStartTime = moment.tz(newStartTime, "Asia/Kolkata").utc().toDate();

    // Find the stage and update the start time
    const stageData = await Stage.findOne();

    if (!stageData) {
      return res.status(404).json({ message: "Stage not found" });
    }

    stageData.start_time = utcStartTime;
    await stageData.save();

    res.json({ message: "Stage start time updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addStage,
  submitFlag,
  getStageLeaderboard,
  getOverallLeaderboard,
  updateUserProgress,
  updateStageStartTime,
};
