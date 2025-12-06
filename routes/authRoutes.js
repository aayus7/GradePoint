const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

// --- MAKE SURE THESE LINES ARE HERE ---
router.post("/forgot-password", authController.forgot_password);
router.post("/reset-password/:token", authController.reset_password);

module.exports = router;
