const router = require("express").Router();
const { categoryControllers } = require("../controllers");
const auth = require('../middleware/auth')


router.post("/create", auth, categoryControllers.createNewCategory);
router.get("/fetch", auth, categoryControllers.fetchAllCategories);

module.exports = router;
