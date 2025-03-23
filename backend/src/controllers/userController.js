const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Function to generate a random CTF ID
const generateCTFId = (fullname) => {
  const namePart = fullname.split(" ")[0]; // Take first name
  const randomNum = Math.floor(100 + Math.random() * 900); // Generate 3-digit random number
  return `Zero_${randomNum}`;
};

// Function to generate a random 8-character password
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // Generates a mix of numbers and letters
};

// ! @desc Register a new user
// ! @route POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { fullname, email, contact_no, college, transaction_id } = req.body;

    // ? Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already registered" });

    // ? Generate CTF ID and password
    const ctf_id = generateCTFId(fullname);
    const plainPassword = generateRandomPassword();

    // ? Hash the generated password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const newUser = new User({
      fullname,
      email,
      contact_no,
      college,
      transaction_id,
      ctf_id,
      password: hashedPassword,
      status: "Playing",
      validity: "pending",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      ctf_id,
      password: plainPassword, // Send the raw password back so the user knows it
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Login user & get token
// ! @route POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { ctf_id, password } = req.body;
    const user = await User.findOne({ ctf_id });

    if (!user)
      return res.status(400).json({ message: "Invalid ctf_id or password" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid ctf_id or password" });

    // ? Generate JWT token
    const token = jwt.sign(
      { userId: user._id, ctf_id: user.ctf_id },
      JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Logout user
// ! @route POST /api/users/logout
const logoutUser = async (req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Get user by ID
// ! @route GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ ctf_id: id });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Update user details
// ! @route PUT /api/users/update/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // console.log("updates", updates);

    const user = await User.findOneAndUpdate({ ctf_id: id }, updates, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Get all users
// ! @route GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Get all users
// ! @route GET /api/users
const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ validity: "pending" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Get count of all users
// ! @route GET /api/users/count
const getCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ! @desc Prune all pending users
// ! @route DELETE /api/users
const pruneUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: "All users pruned" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getAllUsers,
  getUserById,
  getPendingUsers,
  getCount,
  pruneUsers,
};
