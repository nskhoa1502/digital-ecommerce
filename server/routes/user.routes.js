const router = require("express").Router();
const controllers = require("../controllers/user.controllers");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", controllers.register);
router.post("/login", controllers.login);

router.post("/refreshToken", controllers.refreshAccessToken);
router.get("/forgotpassword", controllers.forgotPassword);
router.put("/resetpassword", controllers.resetPassword);

router.use(verifyAccessToken);
router.get("/current-user", controllers.getCurrentUser);
router.get("/logout", controllers.logout);

module.exports = router;
