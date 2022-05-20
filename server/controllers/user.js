const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const User = require("../models/User");
const Journal = require("../models/Journal");

exports.getPredict = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user || user === null) throw { error: "Invalid User" };
    data = await axios.post("http://127.0.0.1:8888/predict", {
      data: req.body.data,
    });
    // update mongo
    words = user.words;
    if (words !== null) {
      for (i = words.length - 1; i >= 0; i--) {
        // check if timestamp older than 7 days
        now = new Date();
        stamp =
          Math.abs(words[i].date.getTime() - now.getTime()) /
          (24 * 60 * 60 * 1000);
        // if yes, delete
        if (stamp > 7) {
          words.splice(i, 1);
        }
        // if no, continue
      }
    }
    user.words = words;
    if (data.data.sentiment === "Negative") {
      arr = data.data.words;
      for (i = 0; i < arr.length; i++) {
        user.words = [...user.words, arr[i]];
      }
    }
    await user.save();

    const newJournal = new Journal({
      entry: req.body.data,
      user: user._id,
    });
    await newJournal.save();
    // return prediction
    res.status(200).json({ success: true, sentiment: data.data.sentiment });
  } catch (err) {
    console.log(err);
    const error = err.error || "Invalid User";
    res.status(400).json({ success: false, err: error });
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user || user === null) throw { error: "Invalid User" };
    // res.status(200).json({ success: true, user: user });
    // get mongo data
    words = user.words;
    // console.log(words);
    // make set and put everything in
    unique_words = [];
    for (i = 0; i < words.length; i++) {
      if (!unique_words.includes(words[i]["entity"]))
        unique_words = [...unique_words, words[i]["entity"]];
    }
    res.status(200).json({ success: true, data: unique_words });
  } catch (err) {
    console.log(err);
    const error = err.error || "Invalid User";
    res.status(400).json({ success: false, err: error });
  }
};
