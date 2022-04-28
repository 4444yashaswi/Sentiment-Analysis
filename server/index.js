const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes setup
// const adminRoutes = require("./routes/admin");

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
// db.connectMongo(); // Not Required Process

// Routes
// app.use(adminRoutes);

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});
