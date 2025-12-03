const Course = require("../models/Course");


const course_index = (req, res) => {
	Course.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("index", { courses: result, title: "All Courses" });
		})
		.catch((err) => {
			console.log(err);
		});
};


const course_create_post = (req, res) => {
	const course = new Course(req.body);

	course
		.save()
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
	course_delete,
};
