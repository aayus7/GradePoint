const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();


const dbURI =
	"mongodb+srv://aayush:12345@midterm.lvwm5l3.mongodb.net/?appName=Midterm";

mongoose
	.connect(dbURI)
	.then((result) =>
		app.listen(3000, () =>
			console.log("Connected & Server Running on 3000")
		)
	)
	.catch((err) => console.log(err));

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => res.render("home"));
app.use(authRoutes);

app.use("/courses", requireAuth, courseRoutes);
