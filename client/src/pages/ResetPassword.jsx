import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
	const [password, setPassword] = useState("");
	const { token } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`/reset-password/${token}`, { password });
			alert("Password updated! Please login.");
			// Hard redirect to login page
			window.location.href = "/login";
		} catch (err) {
			alert(err.response?.data?.error || "Error resetting password");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
			<div className="w-full max-w-sm space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-serif text-white tracking-tight">
						New Password
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Create a new secure password.
					</p>
				</div>

				<form
					className="space-y-6 bg-[#121212] p-8 rounded-2xl border border-white/5"
					onSubmit={handleSubmit}
				>
					<div>
						<p className="text-gray-400 text-sm mb-2 font-medium">
							New Password
						</p>
						<Input
							size="lg"
							type="password"
							variant="bordered"
							placeholder="Enter new password"
							classNames={{
								inputWrapper:
									"flex items-center px-4 border border-white/20 bg-transparent group-data-[focus=true]:!border-white group-data-[focus=true]:!ring-0 group-data-[focus=true]:!ring-offset-0 hover:border-white/40",
								input: "text-white placeholder:text-gray-600 !outline-none",
							}}
							value={password}
							onValueChange={setPassword}
						/>
					</div>

					<Button
						type="submit"
						size="lg"
						fullWidth
						className="bg-white text-black font-bold mt-8 shadow-lg hover:bg-gray-200 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-100 relative overflow-hidden group"
					>
						<span className="relative z-10">Reset Password</span>
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
					</Button>
				</form>
			</div>
		</div>
	);
}
