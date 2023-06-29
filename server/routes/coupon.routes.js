const router = require("express").Router();
const controllers = require("../controllers/coupon.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

// router.put("/", controllers.updateUser);
// router.delete("/", controllers.updateUser);
// router.post("/", controllers.updateUser);
router.get("/", controllers.getCoupons);

router.use(verifyAccessToken);

router.use(verifyAdmin);
router.post("/create-new", controllers.createCoupon);
router.put("/update/:cid", controllers.updateCoupon);
router.delete("/delete/:cid", controllers.deleteCoupon);

module.exports = router;
