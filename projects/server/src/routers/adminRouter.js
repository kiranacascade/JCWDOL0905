const router = require("express").Router();
const adminControllers = require("../controllers/adminControllers");
const auth = require('../middleware/auth');

router.post('/login', auth, adminControllers.login);

module.exports = router;