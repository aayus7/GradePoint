// Ignore harmless React/HeroUI pointer errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  if (err.message.includes('releasePointerCapture')) {
	return false;
  }
  // Let other errors fail the test
  return true;
});

describe("GradePoint Login Flow", () => {
	it("logs in and adds a course", () => {
		// 1. Go to the website
		cy.visit("http://localhost:5173/");
		
		// 2. Click Login
		cy.contains("Log In").click();
		
		// 3. Type credentials (use a real user you have in DB)
		cy.get('input[type="text"]').first().type("test@test.com"); // Change to your email
		cy.get('input[type="password"]').type("123456"); // Change to your password
		
		// 4. Click Continue
		cy.contains("Continue").click();
		
		// 5. Verify we are on Dashboard
		cy.url().should("include", "/dashboard");
		cy.contains("Academic Overview").should("be.visible");
		
		// 6. Add a Course
		cy.get('input[placeholder="e.g. Mathematics"]').type("Cypress Testing");
		cy.get('input[placeholder="0-100"]').type("99");
		cy.contains("Add").click();
		
		// 7. Verify course was added
		cy.contains("Cypress Testing").should("be.visible");
	});
});

it('test', function() {});
