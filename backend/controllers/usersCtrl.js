const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
//! User Registration

const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    // Registration logic goes here
    const { username, email, password } = req.body;
    //! validate
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    //! Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("user already exists");
    }

    //! user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //! create user and save into db
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.send({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //! LOGIN
  // You can add the login handler here when needed

  //! profile
  // You can add the profile handler here when needed
};

module.exports = usersController;
