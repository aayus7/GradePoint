const Course = require("../models/course");

// 1. Get all courses (Read)
const course_index = (req, res) => {
	// Check if user exists to avoid crashing
	if (!res.locals.user) {
		return res.status(401).json({ error: "User not authenticated" });
	}

	const currentUserId = res.locals.user._id;

	Course.find({ userId: currentUserId })
		.sort({ createdAt: -1 })
		.then((result) => {
			// SUCCESS: Send JSON array
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: "Could not fetch courses" });
		});
};

// 2. Create a new course (Create)
const course_create_post = (req, res) => {
	if (!res.locals.user) {
		return res.status(401).json({ error: "User not authenticated" });
	}

	const courseData = {
		subject: req.body.subject,
		grade: req.body.grade,
		userId: res.locals.user._id,
	};

	const course = new Course(courseData);

	course
		.save()
		.then((result) => {
			// SUCCESS: Send the single created object as JSON
			// DO NOT USE res.redirect() HERE!
			res.status(201).json(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ error: "Could not create course" });
		});
};

// 3. Get Single Course for Editing (Read One)
const course_edit_get = (req, res) => {
	const id = req.params.id;

	Course.findById(id)
		.then((result) => {
			if (!result) {
				return res.status(404).json({ error: "Course not found" });
			}
			// Security Check
			if (result.userId.toString() !== res.locals.user._id.toString()) {
				return res.status(403).json({ error: "Unauthorized" });
			}
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(404).json({ error: "Course not found" });
		});
};

// 4. Update Course (Update)
const course_update_post = (req, res) => {
	const id = req.params.id;

	Course.findByIdAndUpdate(id, req.body, { new: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json({ error: "Update failed" });
		});
};

// 5. Delete Course (Delete)
const course_delete = (req, res) => {
	const id = req.params.id;

	Course.findByIdAndDelete(id)
		.then((result) => {
			res.status(200).json({ message: "Course deleted" });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: "Delete failed" });
		});
};

module.exports = {
	course_index,
	course_create_post,
	course_edit_get,
	course_update_post,
	course_delete,
};
