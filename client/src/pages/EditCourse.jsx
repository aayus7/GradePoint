import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button } from "@heroui/react";

export default function EditCourse() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [subject, setSubject] = useState("");
	const [grade, setGrade] = useState("");

	useEffect(() => {
		axios
			.get(`/courses/edit/${id}`)
			.then((res) => {
				setSubject(res.data.subject);
				setGrade(res.data.grade);
			})
			.catch((err) => {
				console.error(err);
				navigate("/dashboard");
			});
	}, [id, navigate]);

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

	const handleUpdate = async () => {
		try {
			await axios.post(`/courses/update/${id}`, { subject, grade });
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
			alert("Update failed");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-[80vh] px-4">
			<div className="w-full max-w-lg">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-serif text-white tracking-tight">
						Edit Course
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Update your academic record.
					</p>
				</div>

				<div className="space-y-6 bg-[#121212] p-8 rounded-2xl border border-white/5">
					<div>
						<p className="text-gray-400 text-sm mb-2 font-medium">
							Subject
						</p>
						<Input
							size="lg"
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

					<div>
						<p className="text-gray-400 text-sm mb-2 font-medium">
							Grade
						</p>
						<Input
							size="lg"
							type="number"
							variant="bordered"
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

					<div className="flex gap-3 mt-4">
						<Button
							className="flex-1 bg-white text-black font-semibold h-12 flex items-center justify-center"
							onPress={handleUpdate}
						>
							Update
						</Button>
						<Button
							className="flex-1 border border-white/20 text-white h-12 flex items-center justify-center"
							variant="bordered"
							onPress={() => navigate("/dashboard")}
						>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
