const router = require("express").Router();
const controllers = require("../controllers/blog.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.get("/", controllers.getBlogs);
router.get("/get-blog/:bid", controllers.getBlog);
router.use(verifyAccessToken);
router.put("/like/:bid", controllers.likeBlog);
router.put("/dislike/:bid", controllers.dislikeBlog);

router.use(verifyAdmin);
router.post("/create-new", controllers.createNewBlog);
router.put("/update/:bid", controllers.updateBlog);
router.put(
  "/upload-image/:bid",
  uploader.single("image"),
  controllers.uploadImageBlog
);
router.delete("/delete/:bid", controllers.deleteBlog);

module.exports = router;
