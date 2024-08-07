const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! User Registration
const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
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
  }),

  //! LOGIN
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //! Check if email is valid
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //! Compare the user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //! Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //! Send response
    res.status(200).json({
      message: "Logged in successfully",
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  }),

  //! Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //! Send the user data
    res.json({
      username: user.username,
      email: user.email,
    });
  }),
};

module.exports = usersController;
