const router = require("express").Router();
const controllers = require("../controllers/blogCategory.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

// router.put("/", controllers.updateUser);
// router.delete("/", controllers.updateUser);
// router.post("/", controllers.updateUser);
router.get("/", controllers.getBlogCategories);

router.use(verifyAccessToken);

router.use(verifyAdmin);
router.post("/create-new", controllers.createBlogCategory);
router.put("/:bcid", controllers.updateBlogCategory);
router.delete("/:bcid", controllers.deleteBlogCategory);

module.exports = router;
