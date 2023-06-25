const router = require("express").Router();
const controllers = require("../controllers/blog.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

router.get("/", controllers.getBlogs);
router.use(verifyAccessToken);
router.put("/likeBlog", controllers.likeBlog);
router.put("/dislikeBlog", controllers.dislikeBlog);

router.use(verifyAdmin);
router.post("/create-new", controllers.createNewBlog);
router.put("/:bid", controllers.updateBlog);

module.exports = router;
