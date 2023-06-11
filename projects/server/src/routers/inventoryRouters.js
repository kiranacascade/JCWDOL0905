const router = require("express").Router();
const { inventoryControllers } = require("../controllers");

router.post("/add", inventoryControllers.addInventory);
router.get("/fetch", inventoryControllers.fetchAllInventories);

module.exports = router;
