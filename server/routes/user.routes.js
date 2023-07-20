const router = require("express").Router();
const controllers = require("../controllers/user.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

router.post("/register", controllers.register);
router.get("/finalregister/:token", controllers.finalRegister);
router.post("/login", controllers.login);

router.post("/refreshToken", controllers.refreshAccessToken);
router.post("/forgotpassword", controllers.forgotPassword);
router.put("/resetpassword", controllers.resetPassword);

router.use(verifyAccessToken);
router.get("/current-user", controllers.getCurrentUser);
router.put("/update-user", controllers.updateUser);
router.get("/logout", controllers.logout);

router.get("/check-user", (req, res, next) => {
  res.status(200).json("You are user");
});

router.use(verifyAdmin);
router.put("/update-address", controllers.updateUserAddress);
router.put("/update-cart", controllers.updateCart);
router.put("/:uid", controllers.updateUserByAdmin);
router.delete("/", controllers.deleteUser);
router.get("/", controllers.getAllUsers);

router.get("/check-admin", (req, res, next) => {
  res.status(200).json("You are admin");
});

module.exports = router;
