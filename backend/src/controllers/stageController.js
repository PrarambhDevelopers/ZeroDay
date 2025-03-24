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
  level1: { flag: "ZERO{09f0976670d3ae87b9fc59547a6fb69b}", points: 20 },
  level2: { flag: "ZERO{3de037315f055b119ae5deb6a00a2d6d}", points: 30 },
  level3: { flag: "ZERO{5e947ee90b377e9bf39759bd4cc386fe}", points: 40 },
  level4: { flag: "ZERO{4e47ae392ff40ea12ecebfa26920bdc6}", points: 50 },
  level5: { flag: "ZERO{0e4dada5469413ecb76b929a5d3f9b57}", points: 60 },
  level6: { flag: "ZERO{15928d92f87fcfa91c0d4a054cdd320e}", points: 70 },
  level7: { flag: "ZERO{e853422664e2a22f815667ae571c55c6}", points: 80 },
  level8: { flag: "ZERO{27b930652c765dddcf9dae6ffc79d56b}", points: 90 },
  level9: { flag: "ZERO{544be1cb45863c401641db916c3348ed}", points: 100 },
};
//640
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
    console.log(req.body);
    // if (!level || !flags[level]) {
    //   return res.status(400).json({ message: "Invalid level provided" });
    // }

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
        .json({status:"time_not_set" , message: "Competition start time not set" });
    }

    // Convert start time to IST
    const competitionStartTime = moment(stage.start_time).tz("Asia/Kolkata");

    // Get the current time in IST
    const currentTime = moment().tz("Asia/Kolkata");

    // console.log("Current Time: ", currentTime.format());
    // console.log("Competition Start Time: ", competitionStartTime.format());

    // Ensure the game has started
    if (currentTime.isBefore(competitionStartTime)) {
      return res.json({status:"not_started" , message: "Game has not started yet" });
    }
    // Ensure the flag is not submitted multiple times
    if (user.submitted_flags?.includes(submittedFlag)) {
      return res.json({status:"duplicate" , message: "Flag already submitted" });
    }

    // Check if the submitted flag is correct
    if (flags[level].flag !== submittedFlag) {
      return res.json({status:"invalid" , message: "Incorrect flag" });
    }

 
    // Award points
    user.points += flags[level].points;

    // Calculate time taken in seconds
    const timeDifference = currentTime.diff(competitionStartTime, "seconds");

    // Ensure time_duration[level] is initialized
    if (!user.time_duration) {
      user.time_duration = 0;
    }

    // Add the time difference to the user's total time
    user.time_duration = timeDifference;

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
      status: "correct",
      message: "Flag submitted successfully",
      points: user.points,
      timeTaken: user.time_duration, // Return time taken in seconds
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
      .select("name ctf_id points time_duration avatar")
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

const toggleLeaderboardVisibility = async (req, res) => {
  try {
    const stage = await Stage.findOne();
    if (!stage) {
      return res.status(404).json({ message: "Stage not found" });
    }
    // Toggle the visibility
    stage.leaderboard_visible = !stage.leaderboard_visible;
    await stage.save();
    res.json({
      message: "Leaderboard visibility updated successfully",
      visibility: stage.leaderboard_visible ? "on" : "off",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get stagedata 
const getStageData = async (req, res) => {
  try {
    const stage = await Stage.findOne();
    if (!stage) {
      return res.status(404).json({ message: "Stage not found" });
    }
    res.json(stage);
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
  toggleLeaderboardVisibility,
  getStageData
};
