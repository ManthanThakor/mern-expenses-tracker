const express = require("express");

const userRouter = express.Router();

userRouter.post("/api/v1/users/register", usersController.register);

// userRouter.post("/api/v1/users/login", usersController.login);

module.exports = userRouter;
