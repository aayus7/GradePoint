const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // <--- Import CORS
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const dbURI =
	"mongodb+srv://aayush:12345@midterm.lvwm5l3.mongodb.net/gradepoint?appName=Midterm";
mongoose
	.connect(dbURI)
	.then((result) =>
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	)
	.catch((err) => console.log(err));

app.use(
	cors({
		origin: ["http://localhost:5173", "https://gradepoint-app.vercel.app"],
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use(checkUser);

app.use(authRoutes);

app.use("/courses", requireAuth, courseRoutes);

// ... existing code ...

// TEST ROUTE: Add this so you know the server is running
app.get("/", (req, res) => {
	res.status(200).json({
		message: "GradePoint Backend API is running successfully!",
	});
});

app.use((req, res) => {
	res.status(404).json({ error: "API endpoint not found" });
});
