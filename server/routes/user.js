const router = require("express").Router();

const userController = require("../controllers/user");
const auth = require("../middlewares/is-auth");

// POST predict
router.post("/predict", auth.isAuth, userController.getPredict);

// POST getInfo
router.get("/info", auth.isAuth, userController.getInfo);

module.exports = router;
