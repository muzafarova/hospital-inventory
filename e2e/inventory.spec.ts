import { test, expect } from './fixtures.js'

test.describe('Inventory', () => {
  test('should display inventory table with products', async ({ loggedInPage }) => {
    await loggedInPage.expectInventoryPage()
    await loggedInPage.expectInventoryTable()
  })

  test('should show user information in header', async ({ loggedInPage }) => {
    await loggedInPage.expectInventoryPage()
  })

  test('should handle 404 page', async ({ loggedInPage }) => {
    await loggedInPage.page.goto('/nonexistent-page')
    await expect(loggedInPage.page).toHaveURL('/404')

    // Test go back to dashboard
    await loggedInPage.page.getByText('Back To Dashboard').click()
    await expect(loggedInPage.page).toHaveURL('/')
    await loggedInPage.expectInventoryPage()
  })

  test('should handle navigation back from 404', async ({ loggedInPage }) => {
    await loggedInPage.page.goto('/nonexistent-page')
    await expect(loggedInPage.page).toHaveURL('/404')

    // Test go back button
    await loggedInPage.page.getByText('Back To Dashboard').click()
    await expect(loggedInPage.page).toHaveURL('/')
  })
})
