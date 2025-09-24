import { test } from './_fixtures.js'

test.describe('Inventory', () => {
  test('should display inventory table', async ({ loggedInPage }) => {
    await loggedInPage.expectInventoryPage()
    await loggedInPage.expectInventoryTable()
  })
})
