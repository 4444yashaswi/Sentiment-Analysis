const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user !== null) throw { error: "Email already exists!" };
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPass,
    });
    await newUser.save();
    res.status(200).json({ success: true, data: newUser });
  } catch (err) {
    console.log(err);
    const error = err.error || "Signup failed";
    res.status(400).json({ success: false, err: error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || user === null) throw { error: "Invalid credentials!" };
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw { error: "Invalid credentials!" };
    const token = jwt.sign(
      { name: user.name, email: email },
      process.env.SECRET
    );
    res.status(200).json({ success: true, token: token });
  } catch (err) {
    console.log(err);
    const error = err.error || "Login failed";
    res.status(400).json({ success: false, err: error });
  }
};

// exports.getUser = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.email });
//     if (!user || user === null) throw { error: "Invalid User" };
//     res.status(200).json({ success: true, user: user });
//   } catch (err) {
//     console.log(err);
//     const error = err.error || "Invalid User";
//     res.status(400).json({ success: false, err: error });
//   }
// };
