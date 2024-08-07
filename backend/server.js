const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();

//!Routes

app.use("/", userRouter);

//! Start the server

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
