const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // <--- Import CORS
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();


const dbURI =
	"mongodb+srv://aayush:12345@midterm.lvwm5l3.mongodb.net/gradepoint?appName=Midterm"; 
mongoose
	.connect(dbURI)
	.then((result) =>
		app.listen(3000, () => console.log("Backend API running on port 3000"))
	)
	.catch((err) => console.log(err));


app.use(
	cors({
		origin: "http://localhost:5173", 
		credentials: true, 
	})
);

app.use(express.json()); 
app.use(cookieParser());


app.use(checkUser);

app.use(authRoutes);


app.use("/courses", requireAuth, courseRoutes);


app.use((req, res) => {
	res.status(404).json({ error: "API endpoint not found" });
});
