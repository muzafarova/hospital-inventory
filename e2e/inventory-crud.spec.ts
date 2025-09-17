import { test, expect } from './fixtures.js'

test.describe('Inventory Operations', () => {
  test.describe('Product Create', () => {
    test('should create a new product successfully', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Click the "Add item" button to open the create modal
      await loggedInPage.page.getByRole('button', { name: 'Add item' }).click()

      // Wait for modal to be visible
      await expect(loggedInPage.page.getByText('New product')).toBeVisible()

      // Fill in the product form
      await loggedInPage.page.getByLabel('Product Name').fill('Test Product')
      
      // Select manufacturer (assuming first option)
      await loggedInPage.page.getByLabel('Manufacturer').selectOption({ index: 1 })
      
      // Select category (assuming first option)
      await loggedInPage.page.getByLabel('Category').selectOption({ index: 1 })
      
      // Fill quantity
      await loggedInPage.page.getByLabel('Quantity').fill('50')
      
      // Fill price if visible
      const priceField = loggedInPage.page.getByLabel('Price')
      if (await priceField.isVisible()) {
        await priceField.fill('29.99')
      }
      
      // Fill expiry date if visible
      const expiryField = loggedInPage.page.getByLabel('Expiry date')
      if (await expiryField.isVisible()) {
        await expiryField.fill('2025-12-31')
      }

      // Submit the form
      await loggedInPage.page.getByRole('button', { name: 'Submit' }).click()

      // Wait for modal to close and verify product was created
      await expect(loggedInPage.page.getByText('New product')).not.toBeVisible()
      
      // Verify the new product appears in the table
      await expect(loggedInPage.page.getByText('Test Product')).toBeVisible()
    })

    test('should show validation errors for empty required fields', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()

      // Click the "Add item" button
      await loggedInPage.page.getByRole('button', { name: 'Add item' }).click()
      await expect(loggedInPage.page.getByText('New product')).toBeVisible()

      // Try to submit without filling required fields
      await loggedInPage.page.getByRole('button', { name: 'Submit' }).click()

      // Verify that the modal is still open (form validation should prevent submission)
      await expect(loggedInPage.page.getByText('New product')).toBeVisible()
    })
  })

  test.describe('Product Update', () => {
    test('should update an existing product successfully', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Find the first product's edit button and click it
      const firstEditButton = loggedInPage.page.locator('button[aria-label="Edit"], button:has(svg):has-text("Edit")').first()
      await firstEditButton.click()

      // Wait for edit modal to be visible
      await expect(loggedInPage.page.getByText('Edit product')).toBeVisible()

      // Update the product name
      const nameField = loggedInPage.page.getByLabel('Product Name')
      await nameField.clear()
      await nameField.fill('Updated Product Name')

      // Update quantity
      const quantityField = loggedInPage.page.getByLabel('Quantity')
      await quantityField.clear()
      await quantityField.fill('75')

      // Update price if visible
      const priceField = loggedInPage.page.getByLabel('Price')
      if (await priceField.isVisible()) {
        await priceField.clear()
        await priceField.fill('39.99')
      }

      // Submit the form
      await loggedInPage.page.getByRole('button', { name: 'Submit' }).click()

      // Wait for modal to close
      await expect(loggedInPage.page.getByText('Edit product')).not.toBeVisible()

      // Verify the product was updated in the table
      await expect(loggedInPage.page.getByText('Updated Product Name')).toBeVisible()
    })

    test('should cancel product update without saving changes', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()

      // Get the original product name from the first row
      const firstProductRow = loggedInPage.page.locator('tbody tr').first()
      const originalName = await firstProductRow.locator('td').nth(1).textContent()

      // Click edit button
      const firstEditButton = loggedInPage.page.locator('button[aria-label="Edit"], button:has(svg):has-text("Edit")').first()
      await firstEditButton.click()

      await expect(loggedInPage.page.getByText('Edit product')).toBeVisible()

      // Make changes to the form
      const nameField = loggedInPage.page.getByLabel('Product Name')
      await nameField.clear()
      await nameField.fill('This Should Not Save')

      // Close modal without submitting (click outside or close button)
      await loggedInPage.page.keyboard.press('Escape')

      // Verify modal is closed
      await expect(loggedInPage.page.getByText('Edit product')).not.toBeVisible()

      // Verify original name is still displayed
      if (originalName) {
        await expect(loggedInPage.page.getByText(originalName.trim())).toBeVisible()
      }
    })
  })

  test.describe('Single Product Remove', () => {
    test('should remove a single product successfully', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Get the name of the product we're about to delete
      const firstProductRow = loggedInPage.page.locator('tbody tr').first()
      const productName = await firstProductRow.locator('td').nth(1).textContent()

      // Click the delete button for the first product
      const firstDeleteButton = loggedInPage.page.locator('button[aria-label="Delete"], button:has(svg):has-text("Delete")').first()
      await firstDeleteButton.click()

      // Verify the product is no longer in the table
      if (productName) {
        // Wait a moment for the deletion to process
        await loggedInPage.page.waitForTimeout(1000)
        
        // Check that the specific product name is no longer visible
        // Note: We need to be careful here as other products might have similar names
        const productElements = await loggedInPage.page.getByText(productName.trim()).count()
        expect(productElements).toBe(0)
      }
    })
  })

  test.describe('Bulk Product Remove', () => {
    test('should select multiple products and remove them', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Get initial product count
      const initialRows = await loggedInPage.page.locator('tbody tr').count()
      
      // Select the first two products by clicking their checkboxes
      await loggedInPage.page.locator('tbody tr').first().locator('input[type="checkbox"]').check()
      await loggedInPage.page.locator('tbody tr').nth(1).locator('input[type="checkbox"]').check()

      // Verify selection count is displayed
      await expect(loggedInPage.page.getByText('2 items selected')).toBeVisible()

      // Click the bulk delete button
      await loggedInPage.page.getByRole('button', { name: 'Delete' }).click()

      // Wait for deletion to complete
      await loggedInPage.page.waitForTimeout(1000)

      // Verify that products were removed (count should be reduced)
      const finalRows = await loggedInPage.page.locator('tbody tr').count()
      expect(finalRows).toBeLessThan(initialRows)
    })

    test('should select all products using select all checkbox', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Get total product count
      const totalRows = await loggedInPage.page.locator('tbody tr').count()

      // Click the "Select all" checkbox in the header
      await loggedInPage.page.locator('thead input[type="checkbox"]').check()

      // Verify all products are selected
      const checkedBoxes = await loggedInPage.page.locator('tbody input[type="checkbox"]:checked').count()
      expect(checkedBoxes).toBe(totalRows)

      // Verify selection count shows all items
      await expect(loggedInPage.page.getByText(`${totalRows} items selected`)).toBeVisible()

      // Uncheck "Select all" to deselect everything
      await loggedInPage.page.locator('thead input[type="checkbox"]').uncheck()

      // Verify no products are selected
      const uncheckedBoxes = await loggedInPage.page.locator('tbody input[type="checkbox"]:checked').count()
      expect(uncheckedBoxes).toBe(0)
    })

    test('should handle bulk delete with no items selected', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Ensure no items are selected
      const checkedBoxes = await loggedInPage.page.locator('tbody input[type="checkbox"]:checked').count()
      expect(checkedBoxes).toBe(0)

      // The delete button should not be visible when no items are selected
      const deleteButton = loggedInPage.page.getByRole('button', { name: 'Delete' })
      await expect(deleteButton).not.toBeVisible()
    })

    test('should show correct selection count when selecting individual items', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()
      await loggedInPage.expectInventoryTable()

      // Select first product
      await loggedInPage.page.locator('tbody tr').first().locator('input[type="checkbox"]').check()
      await expect(loggedInPage.page.getByText('1 items selected')).toBeVisible()

      // Select second product
      await loggedInPage.page.locator('tbody tr').nth(1).locator('input[type="checkbox"]').check()
      await expect(loggedInPage.page.getByText('2 items selected')).toBeVisible()

      // Unselect first product
      await loggedInPage.page.locator('tbody tr').first().locator('input[type="checkbox"]').uncheck()
      await expect(loggedInPage.page.getByText('1 items selected')).toBeVisible()

      // Unselect second product
      await loggedInPage.page.locator('tbody tr').nth(1).locator('input[type="checkbox"]').uncheck()
      
      // Selection UI should be hidden when no items are selected
      const deleteButton = loggedInPage.page.getByRole('button', { name: 'Delete' })
      await expect(deleteButton).not.toBeVisible()
    })
  })

  test.describe('Product Management Integration', () => {
    test('should handle complete product lifecycle - create, update, delete', async ({ loggedInPage }) => {
      await loggedInPage.expectInventoryPage()

      // Step 1: Create a product
      await loggedInPage.page.getByRole('button', { name: 'Add item' }).click()
      await expect(loggedInPage.page.getByText('New product')).toBeVisible()

      await loggedInPage.page.getByLabel('Product Name').fill('Lifecycle Test Product')
      await loggedInPage.page.getByLabel('Manufacturer').selectOption({ index: 1 })
      await loggedInPage.page.getByLabel('Category').selectOption({ index: 1 })
      await loggedInPage.page.getByLabel('Quantity').fill('100')

      const priceField = loggedInPage.page.getByLabel('Price')
      if (await priceField.isVisible()) {
        await priceField.fill('19.99')
      }

      await loggedInPage.page.getByRole('button', { name: 'Submit' }).click()
      await expect(loggedInPage.page.getByText('New product')).not.toBeVisible()
      
      // Verify product was created
      await expect(loggedInPage.page.getByText('Lifecycle Test Product')).toBeVisible()

      // Step 2: Update the product
      const productRow = loggedInPage.page.locator('tr:has-text("Lifecycle Test Product")')
      await productRow.locator('button[aria-label="Edit"], button:has(svg):has-text("Edit")').click()
      
      await expect(loggedInPage.page.getByText('Edit product')).toBeVisible()
      
      const nameField = loggedInPage.page.getByLabel('Product Name')
      await nameField.clear()
      await nameField.fill('Updated Lifecycle Product')
      
      await loggedInPage.page.getByRole('button', { name: 'Submit' }).click()
      await expect(loggedInPage.page.getByText('Edit product')).not.toBeVisible()
      
      // Verify product was updated
      await expect(loggedInPage.page.getByText('Updated Lifecycle Product')).toBeVisible()
      await expect(loggedInPage.page.getByText('Lifecycle Test Product')).not.toBeVisible()

      // Step 3: Delete the product
      const updatedProductRow = loggedInPage.page.locator('tr:has-text("Updated Lifecycle Product")')
      await updatedProductRow.locator('button[aria-label="Delete"], button:has(svg):has-text("Delete")').click()
      
      // Wait for deletion and verify product is gone
      await loggedInPage.page.waitForTimeout(1000)
      await expect(loggedInPage.page.getByText('Updated Lifecycle Product')).not.toBeVisible()
    })
  })
})