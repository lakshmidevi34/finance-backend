const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// basic route
app.get("/", (req, res) => {
  res.send("Finance Backend Running");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
//user routes
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

//auth routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

//record routes
const recordRoutes = require("./routes/recordRoutes");

app.use("/api/records", recordRoutes);

//dashboard routes
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);