const express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const router = require("./routes/adminRoute");

const scheduleRoutes = require('./routes/schedulRoutes'); // Your routes
const bookingRoutes = require('./routes/bookingRoutes'); // Your booking routes


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api", router);
app.use("/api/v1", scheduleRoutes);
app.use("/api/v1", bookingRoutes);

module.exports = app;
