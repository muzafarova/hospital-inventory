import { test, expect } from './_fixtures.js'
import { users, userCredentials } from '../src/mocks/data.js'

test.describe('Authentication', () => {
  test('should show login page for unauthenticated users', async ({ page }) => {
    await page.goto('/')

    // Should redirect to login
    await expect(page).toHaveURL('/login')
  })

  test('should show login form elements', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.expectToBeVisible()
  })

  test('should login successfully with correct credentials', async ({ loginPage }) => {
    await loginPage.goto()

    const { username } = users[0]
    const password = userCredentials[username]
    await loginPage.login(username, password)

    // Should redirect to inventory page
    await expect(loginPage.page).toHaveURL('/')
    await expect(loginPage.page.getByText(username)).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login('testuser', 'wrongpassword')

    // Should show error and stay on login page
    await loginPage.expectLoginError('Failed to login')
  })

  test('should logout successfully', async ({ loggedInPage }) => {
    // Already logged in via fixture
    await loggedInPage.expectButtonProfileVisible()

    // Logout
    await loggedInPage.logout()
  })
})
