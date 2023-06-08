const router = require("express").Router();
const { productControllers } = require("../controllers");

router.post("/add", productControllers.addProduct);
router.get("/get", productControllers.fetchAllProducts);
router.get("/picture/:id", productControllers.fetchProductImage);

module.exports = router;
