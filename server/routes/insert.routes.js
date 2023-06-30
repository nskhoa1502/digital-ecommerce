const router = require("express").Router();
const controllers = require("../controllers/insert.controllers");
const {
  verifyAccessToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");

router.post("/", controllers.insertProduct);
router.post("/category", controllers.insertProductCategory);

module.exports = router;
