const router = require("express").Router();
const controllers = require("../controllers/product.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.get("/", controllers.getProducts);
router.get("/:pid", controllers.getProduct);

router.use(verifyAccessToken);
router.put("/ratings", controllers.ratings);

router.use(verifyAdmin);

router.put(
  "/upload-image/:pid",
  uploader.array("images", 10),
  controllers.uploadImageProduct
);
router.post("/create-new", controllers.createProduct);
router.put("/:pid", controllers.updateProduct);
router.delete("/:pid", controllers.deleteProduct);

module.exports = router;
