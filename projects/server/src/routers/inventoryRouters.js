const router = require("express").Router();
const { inventoryControllers } = require("../controllers");
const auth = require('../middleware/auth')


router.post("/add", auth, inventoryControllers.addInventory);
router.get("/fetch", auth, inventoryControllers.fetchAllInventories);

module.exports = router;
