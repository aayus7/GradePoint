const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // Built-in Node module

// Create a Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "gradepoint secret key", {
		expiresIn: maxAge,
	});
};

// 1. Handle Signup Logic
module.exports.signup_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({ user: user._id });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: "Could not create user" });
	}
};

// 2. Handle Login Logic
module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id });
	} catch (err) {
		res.status(400).json({ error: "Incorrect email or password" });
	}
};

// 3. Logout
module.exports.logout_get = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.status(200).json({ message: "Logged out" });
};

// 4. Forgot Password (Generate Token)
module.exports.forgot_password = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ error: "Email not found" });

		// Generate a random token
		const token = crypto.randomBytes(20).toString("hex");

		// Save token and expiration (1 hour) to user
		user.resetPasswordToken = token;
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
		await user.save();

		// SIMULATED EMAIL SENDING
		// In a real app, you use Nodemailer here.
		// For this project, we return the link so you can test it immediately.

		// This link points to your React Frontend
		const resetLink = `${req.headers.origin}/reset-password/${token}`;

		console.log(`--- PASSWORD RESET LINK: ${resetLink} ---`);

		res.status(200).json({
			message: "Reset link generated",
			link: resetLink,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Server error" });
	}
};

// 5. Reset Password (Verify Token & Update)
module.exports.reset_password = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	try {
		// Find user with this token AND make sure time hasn't expired
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() },
		});

		if (!user)
			return res
				.status(400)
				.json({ error: "Token is invalid or expired" });

		// Update password (pre-save hook in model will hash it)
		user.password = password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();

		res.status(200).json({ message: "Password updated successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Server error" });
	}
};
