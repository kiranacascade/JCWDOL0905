const router = require("express").Router();
const { categoryControllers } = require("../controllers");
const auth = require('../middleware/auth');
const authAdmin = require("../middleware/authAdmin");


router.post("/", auth, authAdmin.verifyToken, categoryControllers.createNewCategory);
router.get("/", auth, categoryControllers.fetchAllCategories);
router.patch("/:id", auth, authAdmin.verifyToken, categoryControllers.updateCategory)
router.delete("/:id", auth, authAdmin.verifyToken, categoryControllers.deleteCategory)

module.exports = router;
