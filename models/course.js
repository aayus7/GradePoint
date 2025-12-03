const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
	{
		subject: {
			type: String,
			required: true,
		},
		grade: {
			type: Number,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;


