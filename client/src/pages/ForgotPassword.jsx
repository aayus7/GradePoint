import React, { useState } from "react";
import { Input, Button, Link } from "@heroui/react";
import axios from "axios";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("/forgot-password", { email });
			// Show the link for Demo purposes
			setMessage(`DEMO MODE: Click to Reset -> ${res.data.link}`);
		} catch (err) {
			alert(err.response?.data?.error || "Error sending request");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
			<div className="w-full max-w-sm space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-serif text-white tracking-tight">
						Reset Password
					</h2>
					<p className="mt-2 text-sm text-gray-400">
						Enter your email to receive a reset link.
					</p>
				</div>

				<form
					className="space-y-6 bg-[#121212] p-8 rounded-2xl border border-white/5"
					onSubmit={handleSubmit}
				>
					<div>
						<p className="text-gray-400 text-sm mb-2 font-medium">
							Email
						</p>
						<Input
							size="lg"
							variant="bordered"
							placeholder="name@example.com"
							autoComplete="email"
							classNames={{
								inputWrapper:
									"flex items-center px-4 border border-white/20 bg-transparent group-data-[focus=true]:!border-white group-data-[focus=true]:!ring-0 group-data-[focus=true]:!ring-offset-0 hover:border-white/40",
								input: "text-white placeholder:text-gray-600 !outline-none",
							}}
							value={email}
							onValueChange={setEmail}
						/>
					</div>

					<Button
						type="submit"
						size="lg"
						fullWidth
						className="bg-white text-black font-bold mt-8 shadow-lg hover:bg-gray-200 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-100 relative overflow-hidden group"
					>
						<span className="relative z-10">Send Link</span>
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
					</Button>
				</form>

				{/* Message for Demo purposes */}
				{message && (
					<div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-200 text-sm break-all">
						<p className="font-bold mb-2">Simulated Email:</p>
						<a
							href={message.split("-> ")[1]}
							className="underline hover:text-white"
						>
							Click here to reset password
						</a>
					</div>
				)}

				<p className="text-center text-xs text-gray-500">
					<Link href="/login" className="text-gray-300 underline">
						Back to Login
					</Link>
				</p>
			</div>
		</div>
	);
}
