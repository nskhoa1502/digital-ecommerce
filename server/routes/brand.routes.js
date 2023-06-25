const router = require("express").Router();
const controllers = require("../controllers/brand.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

// router.put("/", controllers.updateUser);
// router.delete("/", controllers.updateUser);
// router.post("/", controllers.updateUser);
router.get("/", controllers.getBrands);

router.use(verifyAccessToken);

router.use(verifyAdmin);
router.post("/create-new", controllers.createBrand);
router.put("/:brid", controllers.updateBrand);
router.delete("/:brid", controllers.deleteBrand);

module.exports = router;
