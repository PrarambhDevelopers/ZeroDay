const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact_no: { type: String, required: true },
    ctf_id: { type: String, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["Eliminated", "Playing"],
      default: "Playing",
    },
    // stages_completed: { type: [String], default: [] },
    submitted_flags: {
      type: [String],
      default: [],
    },
    avatar: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    last_submission_time: {
      type: Date,
      default: Date.now,
    },
    time_duration: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
