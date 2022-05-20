const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

// To remove CROS (cross-resource-origin-platform) problem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // to allow all client we use *
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  ); //these are the allowed methods
  res.setHeader("Access-Control-Allow-Headers", "*"); // allowed headers (Auth for extra data related to authoriaztiom)
  next();
});

// Connecting to Database
const db = require("./db");
db.connectMongo();

const User = require("./models/User");
const Journal = require("./models/Journal");

// Routes
app.use(adminRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
