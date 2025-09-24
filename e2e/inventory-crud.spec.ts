import { test, expect } from './_fixtures.js'

test.describe('Inventory Operations', () => {
  test.describe('Product Create', () => {
    test('should create a new product successfully', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Click the "Add item" button to open the create modal
      await loggedInPage.buttonAddItem.click()

      // Wait for modal to be visible
      await loggedInPage.expectModalVisible('New product')

      // Fill in the product form
      await loggedInPage.inputProductName.fill('Test Product')

      // Select manufacturer (assuming first option)
      await loggedInPage.selectManufacturer.selectOption({ index: 1 })

      // Select category (assuming first option)
      await loggedInPage.selectCategory.selectOption({ index: 1 })

      // Fill quantity
      await loggedInPage.inputQuantity.fill('50')

      // Fill price if visible
      if (await loggedInPage.inputPrice.isVisible()) {
        await loggedInPage.inputPrice.fill('29.99')
      }

      // Fill expiry date if visible
      if (await loggedInPage.inputExpiryDate.isVisible()) {
        await loggedInPage.inputExpiryDate.fill('2025-12-31')
      }

      // Submit the form
      await loggedInPage.buttonSubmit.click()

      // Wait for modal to close and verify product was created
      await expect(loggedInPage.page.getByText('New product')).toBeHidden()

      // Verify the new product appears in the table
      await expect(loggedInPage.page.getByText('Test Product')).toBeVisible()
    })
  })
})
