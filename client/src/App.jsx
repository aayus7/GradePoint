import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EditCourse from "./pages/EditCourse";

// GLOBAL CONFIG
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
	import.meta.env.VITE_API_URL || "http://localhost:3000";

// This component handles the automatic logout logic
const AuthHandler = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Watch for backend responses
		const interceptor = axios.interceptors.response.use(
			(response) => response, // If success, do nothing
			(error) => {
				// If Backend says "401 Unauthorized" or "403 Forbidden"
				if (
					error.response &&
					(error.response.status === 401 ||
						error.response.status === 403)
				) {
					console.log("Session expired. Logging out...");
					localStorage.removeItem("userEmail"); // Clear the "lie"
					navigate("/login"); // Send user to login
				}
				return Promise.reject(error);
			}
		);

		// Cleanup when app closes
		return () => axios.interceptors.response.eject(interceptor);
	}, [navigate]);

	return null; // This component doesn't render anything visible
};

function App() {
	return (
		<Router>
			{/* Run the Auth Handler inside the Router */}
			<AuthHandler />

			<div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
				<Navbar />
				<div className="container mx-auto pt-6 px-6 max-w-7xl flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/edit/:id" element={<EditCourse />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
