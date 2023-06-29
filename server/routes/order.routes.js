const router = require("express").Router();
const controllers = require("../controllers/order.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

// router.put("/", controllers.updateUser);
// router.delete("/", controllers.updateUser);
// router.post("/", controllers.updateUser);

router.use(verifyAccessToken);
router.get("/", controllers.getOrdersUser);

router.use(verifyAdmin);
router.get("/admin/", controllers.getAllOrdersAdmin);
router.get("/admin/:uid", controllers.getUserOrdersAdmin);
router.post("/create-new", controllers.createOrder);
router.put("/status/:oid", controllers.updateOrderStatus);
router.delete("/:oid", controllers.deleteOrder);

module.exports = router;
