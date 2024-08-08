const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use("/", userRouter);
app.use("/", categoryRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
