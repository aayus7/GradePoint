const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// Check json web token exists & is verified
	if (token) {
		jwt.verify(token, "gradepoint secret key", (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				// API FIX: Send JSON error instead of redirect
				res.status(401).json({ error: "Authentication token invalid" });
			} else {
				next();
			}
		});
	} else {
		// API FIX: Send JSON error instead of redirect
		res.status(401).json({ error: "No authentication token found" });
	}
};

// Check current user
const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(
			token,
			"gradepoint secret key",
			async (err, decodedToken) => {
				if (err) {
					console.log(err.message);
					res.locals.user = null;
					next();
				} else {
					try {
						let user = await User.findById(decodedToken.id);
						res.locals.user = user;
						next();
					} catch (error) {
						console.log("Error finding user:", error);
						res.locals.user = null;
						next();
					}
				}
			}
		);
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { requireAuth, checkUser };
