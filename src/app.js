const express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const router = require("./routes");

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
app.use("/api", router);

module.exports = app;
