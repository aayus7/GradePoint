import React from "react";
import { Button, Link } from "@heroui/react";

export default function Home() {
	const user = localStorage.getItem("userEmail");

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-hidden">
			{/* Background Glow Effect */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

			<div className="relative z-10 max-w-2xl">
				<h1 className="text-6xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
					Master your <br />
					<span className="italic text-gray-400">
						academic potential.
					</span>
				</h1>
				<p className="text-lg text-gray-400 mb-10 font-light leading-relaxed">
					GradePoint is the minimalist, intelligent way to track your
					university progress. Focus on learning, not calculating.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					{user ? (
						<Button
							as={Link}
							href="/dashboard"
							size="lg"
							className="bg-white text-black font-medium rounded-full px-8 h-14 flex items-center justify-center"
						>
							Open Dashboard
						</Button>
					) : (
						<>
							<Button
								as={Link}
								href="/signup"
								size="lg"
								className="bg-white text-black font-medium rounded-full px-8 h-14 flex items-center justify-center"
							>
								Start Tracking
							</Button>
							<Button
								as={Link}
								href="/login"
								size="lg"
								variant="bordered"
								className="text-white border-white/20 rounded-full px-8 h-14 flex items-center justify-center hover:bg-white/10"
							>
								Log In
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
