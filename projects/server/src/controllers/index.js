const userController = require("./userController");
const adminControllers = require("./adminControllers");
const profileController = require("./profileController");
const addressController = require("./addressController");
const branchController = require("./branchController");
const suggestionController = require("./suggestionController");
const categoryControllers = require("./categoryControllers");
const productControllers = require("./productControllers");
const inventoryControllers = require("./inventoryControllers");
const discountController = require("./discountController")
const voucherController = require("./voucherController")
const cartController = require("./cartController")

module.exports = {
    userController,
    profileController,
    addressController,
    branchController,
    suggestionController,
    categoryControllers,
    productControllers,
    inventoryControllers,
    cartController,
    adminControllers,
    discountController,
    voucherController
}
  



