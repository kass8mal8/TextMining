const { Router } = require("express");
const {
	signup,
	signin,
	verifyOTP,
	signout,
	authenticate,
	refreshAccessToken,
	getUser,
} = require("../controllers/auth");
const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/verify_otp", verifyOTP);
router.post("/signout", signout);
router.get("/refresh_token", refreshAccessToken);
router.get("/profile", authenticate, (req, res) => {
	res.json({ user: req.user });
});
router.get("/users", getUser);

module.exports = router;
