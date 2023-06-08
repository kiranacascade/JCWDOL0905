const router = require("express").Router();
const { inventoryControllers } = require("../controllers");

router.post("/add", inventoryControllers.addInventory);
router.get("/fetch", inventoryControllers.fetchAllInventories);
router.get("/fetch/category/:id", inventoryControllers.fetchInventoryByCategory);

module.exports = router;
