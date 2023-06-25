const router = require("express").Router();
const controllers = require("../controllers/productCategory.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

// router.put("/", controllers.updateUser);
// router.delete("/", controllers.updateUser);
// router.post("/", controllers.updateUser);
router.get("/", controllers.getCategories);

router.use(verifyAccessToken);

router.use(verifyAdmin);
router.post("/create-new", controllers.createCategory);
router.put("/:pcid", controllers.updateCategory);
router.delete("/:pcid", controllers.deleteCategory);

module.exports = router;
