const fs = require("fs");
const User = require("./src/models/User");
const connectToMongo = require("./src/config/db");
const { sendWelcomeEmail } = require("./src/utility/emailService");
connectToMongo();

const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // 8 character password
};

const registerUser = async (user, index) => {
  try {
    const { name, email, contact_no } = user;

    // Generate a random password

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already registered:", email);
      return; // Skip this user if already registered
    }

    // Generate CTF ID and password
    const ctf_id = `Zero_${100 + index}`;
    const password = generateRandomPassword();

    // Create a new user
    const newUser = new User({
      name,
      email,
      ctf_id,
      password,
      contact_no,
    });

    // Save the user to the database
    await newUser.save();
    await sendWelcomeEmail(email, name, ctf_id, password);
    console.log(
      "User registered successfully! -> ",
      name,
      " -> ",
      ctf_id,
      " -> ",
      password
    );
  } catch (error) {
    console.error("Server error:", error.message); // Use console.error for errors
  }
};

// Read the JSON file with user data
fs.readFile("./users.json", "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading the file:", err); // Use console.error for file read errors
    return;
  }

  try {
    // Parse JSON data
    const users = JSON.parse(data);

    // Iterate through the users and register each user
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      await registerUser(user, index); // Call registerUser for each user
    }
  } catch (parseError) {
    console.error("Error parsing JSON data:", parseError); // Use console.error for JSON parse errors
  }
});

module.exports = registerUser;
