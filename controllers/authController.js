const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Create a Token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "gradepoint secret key", {
		expiresIn: maxAge,
	});
};

// 1. Show Signup Page
module.exports.signup_get = (req, res) => {
	res.render("signup");
};

// 2. Show Login Page
module.exports.login_get = (req, res) => {
	res.render("login");
};

// 3. Handle Signup Logic
module.exports.signup_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		// SUCCESS: Send user ID
		res.status(201).json({ user: user._id });
	} catch (err) {
		console.log("SIGNUP ERROR:", err);
		// FAILURE: Send nice error message
		let errorMessage = "Could not create user";
		if (err.code === 11000)
			errorMessage = "That email is already registered";
		if (err.message.includes("minimum allowed length"))
			errorMessage = "Password must be 6+ chars";

		res.status(400).json({ error: errorMessage });
	}
};

// 4. Handle Login Logic
module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;

	console.log(`--- LOGIN ATTEMPT ---`);
	console.log(`Email provided: ${email}`);
	console.log(`Password provided: ${password}`);

	try {
		const user = await User.login(email, password);
		console.log("LOGIN SUCCESS: User found with ID:", user._id);

		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id, message: "Login successful" });
	} catch (err) {
		console.log("LOGIN FAILED:", err.message);
		res.status(400).json({ error: "Incorrect email or password" });
	}
};

// 5. Logout
module.exports.logout_get = (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
};
