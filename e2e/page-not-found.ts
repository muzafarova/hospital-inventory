import { test, expect } from "./_fixtures.js";

test.describe("Page Not Found", () => {
  test("should handle 404 page", async ({ loggedInPage }) => {
    await loggedInPage.page.goto("/nonexistent-page");
    await expect(loggedInPage.page).toHaveURL("/404");

    // Test go back to dashboard
    await loggedInPage.page.getByText("Back To Dashboard").click();
    await expect(loggedInPage.page).toHaveURL("/");
  });

  test("should handle navigation back from 404", async ({ loggedInPage }) => {
    await loggedInPage.page.goto("/nonexistent-page");
    await expect(loggedInPage.page).toHaveURL("/404");

    // Test go back button
    await loggedInPage.page.getByText("Back To Dashboard").click();
    await expect(loggedInPage.page).toHaveURL("/");
  });
});
