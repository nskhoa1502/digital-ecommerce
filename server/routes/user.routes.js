const router = require("express").Router();
const controllers = require("../controllers/user.controllers");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", controllers.register);
router.post("/login", controllers.login);

router.use(verifyAccessToken);

router.get("/current-user", controllers.getCurrentUser);

module.exports = router;
