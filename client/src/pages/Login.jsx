import React, { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import axios from "axios";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// FIX 1: Accept event 'e'
	const handleSubmit = async (e) => {
		// FIX 2: Stop the browser from reloading the page
		e.preventDefault();

		try {
			const res = await axios.post("/login", { email, password });
			if (res.data.user) {
				localStorage.setItem("userEmail", email);
				window.location.href = "/dashboard";
			}
		} catch (err) {
			console.error(err);
			alert("Invalid credentials.");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
			<div className="w-full max-w-sm space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-serif text-white tracking-tight">
						Welcome back
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Enter your credentials.
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
							placeholder="Enter password"
							autoComplete="new-password"
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
						// FIX 3: Removed onPress (The form onSubmit handles it now)
					>
						<span className="relative z-10">Continue</span>
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
					</Button>
				</form>

				<p className="text-center text-xs text-gray-500">
					Don't have an account?{" "}
					<Link href="/signup" className="text-gray-300 underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
