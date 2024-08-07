const asyncHandler = require("express-async-handler");
const User = require("../model/User");

//! User Registration

const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    // Registration logic goes here
    res.json({ message: "Register" });
  }),

  //! LOGIN
  // You can add the login handler here when needed

  //! profile
  // You can add the profile handler here when needed
};

module.exports = usersController;
