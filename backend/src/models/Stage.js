const mongoose = require("mongoose");

const StageSchema = new mongoose.Schema(
  {
    start_time: { type: Date, default: null }, // Store the competition start time
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stage", StageSchema);
