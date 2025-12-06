import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Input,
	Button,
	Chip,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
	const [courses, setCourses] = useState([]);
	const [subject, setSubject] = useState("");
	const [grade, setGrade] = useState("");
	const navigate = useNavigate();
	const user = localStorage.getItem("userEmail");

	useEffect(() => {
		if (!user) return navigate("/login");
		axios
			.get("/courses")
			.then((res) => setCourses(res.data))
			.catch((err) => console.error(err));
	}, []);

	const handleSubjectChange = (value) => {
		if (/^[A-Za-z\s]*$/.test(value)) setSubject(value);
	};

	const handleGradeChange = (value) => {
		if (value === "") {
			setGrade("");
			return;
		}
		const num = Number(value);
		if (!isNaN(num) && num >= 0 && num <= 100) setGrade(value);
	};

	const handleSubmit = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (!subject || grade === "") {
			alert("Please fill in both Subject and Grade.");
			return;
		}

		try {
			const res = await axios.post("/courses", { subject, grade });
			setCourses([res.data, ...courses]);
			setSubject("");
			setGrade("");
		} catch (err) {
			console.error(err);
			alert("Failed to add course.");
		}
	};

	const handleDelete = async (id) => {
		if (!confirm("Are you sure you want to delete this course?")) return;
		try {
			await axios.delete(`/courses/${id}`);
			setCourses(courses.filter((c) => c._id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="max-w-5xl mx-auto py-12 px-6">
			<div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
				<div>
					<h1 className="text-4xl font-serif text-white mb-2">
						Academic Overview
					</h1>
					<p className="text-gray-400 text-sm tracking-wide">
						WELCOME BACK, {user?.toUpperCase()}
					</p>
				</div>
			</div>

			<div className="flex gap-4 mb-12 bg-[#121212] p-6 rounded-xl border border-white/5 items-end">
				<div className="flex-1">
					<p className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-bold">
						Subject
					</p>
					<Input
						size="lg"
						placeholder="e.g. Mathematics"
						variant="bordered"
						classNames={{
							// FIX: Added 'flex items-center px-4'
							inputWrapper:
								"flex items-center px-4 border border-white/20 bg-transparent group-data-[focus=true]:!border-white group-data-[focus=true]:!ring-0 group-data-[focus=true]:!ring-offset-0",
							input: "text-white !outline-none",
						}}
						value={subject}
						onValueChange={handleSubjectChange}
					/>
				</div>

				<div className="flex-1">
					<p className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-bold">
						Grade
					</p>
					<Input
						size="lg"
						placeholder="0-100"
						type="number"
						variant="bordered"
						min="0"
						max="100"
						classNames={{
							// FIX: Added 'flex items-center px-4'
							inputWrapper:
								"flex items-center px-4 border border-white/20 bg-transparent group-data-[focus=true]:!border-white group-data-[focus=true]:!ring-0 group-data-[focus=true]:!ring-offset-0",
							input: "text-white !outline-none",
						}}
						value={grade}
						onValueChange={handleGradeChange}
					/>
				</div>

				<Button
					size="lg"
					type="button"
					className="bg-white text-black font-bold px-10 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-gray-200 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-100 relative overflow-hidden group"
					onPress={(e) => handleSubmit(e)}
				>
					<span className="relative z-10">Add</span>
					<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{courses.map((course) => (
					<Card
						key={course._id}
						className="bg-[#121212] border border-white/10 hover:border-white/30 transition-all shadow-none"
					>
						<CardHeader className="flex justify-between pb-0 pt-4 px-4">
							<h4 className="text-lg font-medium text-gray-200">
								{course.subject}
							</h4>
							<Chip
								size="sm"
								variant="dot"
								color={
									course.grade >= 50 ? "success" : "danger"
								}
								classNames={{ base: "border-none" }}
							>
								{course.grade >= 50 ? "PASS" : "FAIL"}
							</Chip>
						</CardHeader>
						<CardBody className="py-8">
							<p className="text-5xl font-serif text-center text-white tracking-tighter">
								{course.grade}
								<span className="text-2xl text-gray-500 font-sans">
									%
								</span>
							</p>
						</CardBody>
						<CardFooter className="border-t border-white/5 flex justify-between px-4 py-3">
							<Link
								to={`/edit/${course._id}`}
								className="text-xs text-gray-400 hover:text-white uppercase tracking-wider font-semibold"
							>
								Edit
							</Link>
							<button
								onClick={() => handleDelete(course._id)}
								className="text-xs text-red-900 hover:text-red-500 uppercase tracking-wider font-semibold transition-colors"
							>
								Remove
							</button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
