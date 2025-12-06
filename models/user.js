const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	// NEW: Fields for password reset
	resetPasswordToken: String,
	resetPasswordExpires: Date,
});

userSchema.pre("save", async function () {
	// If password is NOT modified, just return (exit the function)
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email: email.toLowerCase() });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
