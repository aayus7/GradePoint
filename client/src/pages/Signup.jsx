import React, { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			const res = await axios.post("/signup", { email, password });

			if (res.data.user) {
				localStorage.setItem("userEmail", email);
				navigate("/dashboard");
				window.location.reload();
			}
		} catch (err) {
			alert(err.response?.data?.error || "Signup failed");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
			<div className="w-full max-w-sm space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-serif text-white tracking-tight">
						Create Account
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Join GradePoint today.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-6 bg-[#121212] p-8 rounded-2xl border border-white/5"
					autoComplete="off"
				>
					<div>
						<p className="text-gray-400 text-sm mb-2 font-medium">
							Email
						</p>
						<Input
							size="lg"
							variant="bordered"
							placeholder="name@example.com"
							autoComplete="new-password"
							classNames={{
								// FIX: Added 'flex items-center px-4'
								inputWrapper:
									"flex items-center px-4 border border-white/20 bg-transparent group-data-[focus=true]:!border-white group-data-[focus=true]:!ring-0 group-data-[focus=true]:!ring-offset-0 hover:border-white/40",
								input: "text-white placeholder:text-gray-600 !outline-none",
							}}
							value={email}
							onValueChange={setEmail}
						/>
					</div>

					<div>
						<p className="text-gray-400 text-sm mb-2 font-medium">
							Password
						</p>
						<Input
							size="lg"
							type="password"
							variant="bordered"
							placeholder="Create password"
							autoComplete="new-password"
							classNames={{
								// FIX: Added 'flex items-center px-4'
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
						onPress={handleSubmit}
					>
						<span className="relative z-10">Sign Up</span>
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
					</Button>
				</form>

				<p className="text-center text-xs text-gray-500">
					Already have an account?{" "}
					<Link href="/login" className="text-gray-300 underline">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
