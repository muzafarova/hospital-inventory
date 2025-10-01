import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.js";
import { InventoryPage } from "./pages/inventory.js";
import { users, userCredentials } from "../src/mocks/data.js";

// Define custom fixtures
type TestFixtures = {
  loginPage: LoginPage;
  loggedInPage: InventoryPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<TestFixtures>({
  // Fixture for login page actions
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture for already logged in page
  loggedInPage: async ({ page, loginPage }, use) => {
    const { username } = users[0];
    const password = userCredentials[username];

    // Perform login
    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for successful login
    await expect(page).toHaveURL("/");

    // Create page object with logged-in context
    const loggedInPage = new InventoryPage(page);
    await use(loggedInPage);
  },

  // Fixture for already logged in page
  inventoryPage: async ({ page, loginPage }, use) => {
    const { username } = users[0];
    const password = userCredentials[username];

    // Perform login
    await loginPage.goto();
    await loginPage.login(username, password);

    // Wait for successful login
    await expect(page).toHaveURL("/");

    // Create page object with logged-in context
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

export { expect };
