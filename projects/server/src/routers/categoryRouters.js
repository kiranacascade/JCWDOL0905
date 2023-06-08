const router = require("express").Router();
const { categoryControllers } = require("../controllers");

router.post("/create", categoryControllers.createNewCategory);
router.get("/fetch", categoryControllers.fetchAllCategories);

module.exports = router;
