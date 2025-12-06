import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { describe, it, expect } from "vitest";

describe("Login Component", () => {
	it("renders the login form elements", () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);

		// Check for the "Welcome back" text
		expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();

		// Check for the Email input (via placeholder or label text)
		expect(screen.getByText(/Email/i)).toBeInTheDocument();

		// Check for the Continue button
		expect(
			screen.getByRole("button", { name: /Continue/i })
		).toBeInTheDocument();
	});
});
