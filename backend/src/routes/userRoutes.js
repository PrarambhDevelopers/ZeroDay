const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getPendingUsers,
  getCount,
  pruneUsers
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers); // ! Fetch all users
router.get("/count", getCount); // ! Fetch all users
router.post("/register", registerUser); // ! Register a new user
router.post("/login", loginUser); // ! Login user
router.post("/logout", logoutUser); // Logout user .. Useless actually
router.put("/update/:id", updateUser); // ! Update user details
router.get("/pending", getPendingUsers); // ! Fetch all pending users
router.delete("/", pruneUsers); // ! Fetch all pending users

module.exports = router;
