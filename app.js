const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();

app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (origin) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, X-Requested-With"
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use(express.json());
app.use(cookieParser());
app.use(checkUser);

const dbURI =
	process.env.DB_URI ||
	"mongodb+srv://aayush:12345@midterm.lvwm5l3.mongodb.net/gradepoint?appName=Midterm";

mongoose
	.connect(dbURI)
	.then((result) => {
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () =>
			console.log(`Backend API running on port ${PORT}`)
		);
	})
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.status(200).json({
		message: "GradePoint Backend API is running successfully!",
	});
});

app.use(authRoutes);
app.use("/courses", requireAuth, courseRoutes);

app.use((req, res) => {
	res.status(404).json({ error: "API endpoint not found" });
});
