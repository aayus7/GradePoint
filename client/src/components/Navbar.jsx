import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AppNavbar() {
	const navigate = useNavigate();
	const user = localStorage.getItem("userEmail");

	const handleLogout = async () => {
		try {
			await axios.get("/logout");
		} catch (err) {
			console.error("Logout API error:", err);
		} finally {
			localStorage.removeItem("userEmail");
			window.location.href = "/";
		}
	};

	const handleMenuAction = (key) => {
		if (key === "logout") handleLogout();
		if (key === "dash") navigate("/dashboard");
	};

	return (
		// FIX 1: Increased height to 'h-20' (80px) to fit the bigger logo
		<Navbar
			className="bg-black/50 backdrop-blur-md border-b border-white/10 h-20 relative"
			maxWidth="xl"
		>
			{/* LEFT SIDE */}
			<NavbarContent justify="start">
				<NavbarBrand>
					<Link
						href="/"
						className="font-serif text-2xl tracking-tighter text-white hover:opacity-80 transition-opacity"
					>
						GradePoint.
					</Link>
				</NavbarBrand>
			</NavbarContent>

			{/* CENTER - LOGO (BIGGER & CIRCLE) - Absolutely positioned for true centering */}
			<Link 
				href="/"
				className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
			>
				<img
					src="/logo.jpg" // Make sure your file is here!
					alt="Logo"
					// FIX 2: h-14 w-14 (Larger), rounded-full (Circle), ring (Border)
					className="h-20 w-20 rounded-full object-cover ring-2 ring-white/20 hover:ring-white/50 transition-all"
				/>
			</Link>

			{/* RIGHT SIDE */}
			<NavbarContent justify="end" className="items-center">
				{user ? (
					<Dropdown
						placement="bottom-end"
						className="dark text-foreground bg-[#121212] border border-white/10"
					>
						<DropdownTrigger>
							<Avatar
								as="button"
								className="transition-transform ring-2 ring-white/20 cursor-pointer w-14 h-14"
								src={`https://i.pravatar.cc/150?u=${user}`}
								size="sm"
							/>
						</DropdownTrigger>

						<DropdownMenu
							aria-label="Profile Actions"
							variant="flat"
							onAction={handleMenuAction}
						>
							<DropdownItem
								key="info"
								className="h-14 gap-2 opacity-100 cursor-default"
								textValue="Signed in as"
							>
								<p className="font-semibold text-xs uppercase tracking-widest text-gray-500">
									Signed in as
								</p>
								<p className="font-semibold text-white">
									{user}
								</p>
							</DropdownItem>
							<DropdownItem
								key="dash"
								textValue="Dashboard"
								className="cursor-pointer hover:bg-white/10"
							>
								Dashboard
							</DropdownItem>
							<DropdownItem
								key="logout"
								color="danger"
								textValue="Log Out"
								className="cursor-pointer text-red-500 hover:bg-red-500/10"
							>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						<NavbarItem className="flex items-center">
							<Link
								href="/login"
								className="text-sm text-gray-400 hover:text-white transition-all duration-300 px-4 py-2.5 rounded-lg hover:scale-105 relative group"
							>
								<span className="relative z-10">Login</span>
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ease-out"></span>
							</Link>
						</NavbarItem>
						<NavbarItem className="flex items-center">
							<Button
								as={Link}
								href="/signup"
								size="sm"
								className="bg-white text-black font-medium rounded-full px-8 py-3 flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] active:scale-105 relative overflow-hidden group"
							>
								<span className="relative z-10">Sign Up</span>
								<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}
