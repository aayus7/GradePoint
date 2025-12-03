import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#000000",
				content1: "#121212", // Slightly lighter black for cards
				content2: "#1c1c1c",
				primary: {
					DEFAULT: "#3b82f6", // AI Blue
					foreground: "#ffffff",
				},
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				serif: ["Playfair Display", "serif"],
			},
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				dark: {
					colors: {
						background: "#000000", // Force black
						content1: "#121212",
					},
				},
			},
		}),
	],
};
