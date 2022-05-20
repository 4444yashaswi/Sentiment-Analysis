const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.isAuth = async (req, res, next) => {
  try {
    const { email } = jwt.verify(
      req.headers["x-access-token"],
      process.env.SECRET
    );
    req.email = email;
    return next();
  } catch (err) {
    console.log(err);
    const error = err.error || "Invalid Token!";
    return res.status(400).json({ success: false, err: error });
  }
};

// exports.checkAuth = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.email });
//     let exists = false;
//     for (const task of user.tasks) {
//       console.log(
//         `${JSON.stringify(task)} --- ${JSON.stringify(req.headers["task-id"])}`
//       );
//       if (JSON.stringify(task) === JSON.stringify(req.headers["task-id"])) {
//         exists = true;
//         break;
//       }
//     }
//     if (!exists || exists === null || exists === undefined)
//       throw { error: "Access Denied" };
//     req.taskId = req.headers["task-id"];
//     return next();
//   } catch (err) {
//     console.log(err);
//     const error = err.error || "Invalid Token!";
//     return res.status(400).json({ success: false, err: error });
//   }
// };
