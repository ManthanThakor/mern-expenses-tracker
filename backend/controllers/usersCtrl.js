const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Add JWT for authentication

//! User Registration
const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      //! Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      //! Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      //! Hash user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //! Create user and save into DB
      const userCreated = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      //! Send response
      res.status(201).json({
        username: userCreated.username,
        email: userCreated.email,
        id: userCreated._id,
      });
    } catch (error) {
      //! Handle errors
      res.status(500).json({ message: error.message });
    }
  }),

  //! LOGIN

  login: asyncHandler(async (req, res) => {
    //! get the user data
    const { email, password } = req.body;

    //! check if email is valid
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //! compare the user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //! Generate JWT token
    const token = jwt.sign({
      id: user._id,
      username: user.username,
    });
  }),

  //! profile
  // You can add the profile handler here when needed
};

module.exports = usersController;
