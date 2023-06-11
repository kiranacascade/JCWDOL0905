const router = require("express").Router();
const { productControllers } = require("../controllers");

router.post("/add", productControllers.addProduct);
router.get("/get", productControllers.fetchAllProducts);

module.exports = router;
