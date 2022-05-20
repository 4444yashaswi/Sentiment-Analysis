const router = require("express").Router();

const adminController = require("../controllers/admin");
const auth = require("../middlewares/is-auth");

// POST signup
router.post("/signup", adminController.signup);

// POST login
router.post("/login", adminController.login);

// GET profile
// router.get("/profile", auth.isAuth, adminController.getUser);

module.exports = router;
