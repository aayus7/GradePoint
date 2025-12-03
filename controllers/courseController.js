const Course = require("../models/course.js");


const course_index = (req, res) => {
	const currentUserId = res.locals.user._id;

	Course.find({ userId: currentUserId })
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("index", { courses: result, title: "My Courses" });
		})
		.catch((err) => {
			console.log(err);
		});
};


const course_create_post = (req, res) => {
	const courseData = {
		subject: req.body.subject,
		grade: req.body.grade,
		userId: res.locals.user._id,
	};

	const course = new Course(courseData);

	course
		.save()
		.then((result) => {
			res.redirect("/courses");
		})
		.catch((err) => {
			console.log(err);
		});
};


const course_edit_get = (req, res) => {
	const id = req.params.id;

	Course.findById(id)
		.then((result) => {
			if (result.userId.toString() !== res.locals.user._id.toString()) {
				return res.redirect("/courses");
			}
			res.render("edit", { course: result, title: "Edit Course" });
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/courses");
		});
};


const course_update_post = (req, res) => {
	const id = req.params.id;

	Course.findByIdAndUpdate(id, req.body)
		.then((result) => {
			res.redirect("/courses");
		})
		.catch((err) => {
			console.log(err);
		});
};


const course_delete = (req, res) => {
	const id = req.params.id;

	Course.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/courses" });
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = {
	course_index,
	course_create_post,
	course_edit_get, // Exported
	course_update_post, // Exported
	course_delete,
};
