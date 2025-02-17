const router = require("express").Router()
const { userController } = require('../controllers')
const auth = require('../middleware/auth')


router.post('/register', auth, userController.register)
router.post('/login', auth, userController.login)
router.get("/auth", auth, userController.getUserByToken)
router.get("/:id_user/verify/:token", auth, userController.verify);
router.post("/resend-verification", auth, userController.resendVerification);
router.post("/forgot-password", auth, userController.forgotPasswordSendEmail);
router.post("/resend-forgot-password", auth, userController.resendEmailForgotPassword);
router.get("/:id_user/verify-forgot-password/:token", userController.verifyForgotPassword);
router.post("/reset-password", auth, userController.resetPassword);
router.post("/change-password", auth, userController.changePassword);

module.exports = router