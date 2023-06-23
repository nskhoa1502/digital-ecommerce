const router = require("express").Router();
const controllers = require("../controllers/product.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

router.get("/", controllers.getProducts);
router.get("/:pid", controllers.getProduct);

router.use(verifyAccessToken);

router.use(verifyAdmin);

router.post("/create-new", controllers.createProduct);
router.put("/:pid", controllers.updateProduct);
router.delete("/:pid", controllers.deleteProduct);

module.exports = router;
