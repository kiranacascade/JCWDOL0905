const userRouter = require('./userRouter')
const profileRouter = require('./profileRouter')
const addressRouter = require('./addressRouter')
const branchRouter = require('./branchRouter')
const suggestionRouter = require('./suggestionRouter')
const categoryRouters = require("./categoryRouters");
const productRouters = require("./productRouters");
const inventoryRouters = require("./inventoryRouters");
const cartRouter = require("./cartRouter");
const cityRouter = require("./cityRouter")
const shippingRouter = require("./shippingRouter")
const transactionRouter = require("./transactionRouter")
const voucherRouter = require("./voucherRouter")

module.exports = {
    userRouter,
    profileRouter,
    addressRouter,
    branchRouter,
    suggestionRouter,
    categoryRouters,
    productRouters,
    inventoryRouters,
    cartRouter,
    cityRouter,
    shippingRouter,
    transactionRouter,
    voucherRouter,
}


