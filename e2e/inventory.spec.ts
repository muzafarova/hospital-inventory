import { test, expect } from './_fixtures.js'

test.describe('Inventory', () => {
  test('should have a page-level heading', async ({ inventoryPage }) => {
    await inventoryPage.expectHeading()
  })

  test.describe('List items', () => {
    test('should display inventory table', async ({ inventoryPage }) => {
      await inventoryPage.expectInventoryTable()
    })

    test('should select correct number of products', async ({ inventoryPage }) => {
      await inventoryPage.tbodyCheckboxes.first().check()
      await inventoryPage.tbodyCheckboxes.nth(1).check()
      await inventoryPage.tbodyCheckboxes.nth(2).check()

      await expect(inventoryPage.page.getByText('3 items selected')).toBeVisible()
    })

    test('should select all products in the table', async ({ inventoryPage }) => {
      await inventoryPage.theadCheckbox.check()

      await expect(inventoryPage.page.getByText('100 items selected')).toBeVisible()
    })

    test('should deselect all products in the table', async ({ inventoryPage }) => {
      await inventoryPage.theadCheckbox.click()
      await inventoryPage.theadCheckbox.click()

      await expect(inventoryPage.table.getByRole('checkbox', { checked: true })).toHaveCount(0)
    })
  })

  test.describe('Add item', () => {
    test('should create a new product successfully', async ({ inventoryPage }) => {
      await inventoryPage.expectButtonCreateVisible()

      // Click the "Add item" button to open the create modal
      await inventoryPage.buttonCreate.click()

      // Wait for modal to be visible
      const modal = await inventoryPage.getModal('New product')
      await expect(modal).toBeVisible()

      // Fill in the form fields
      await modal.getByLabel('Product Name').fill('Test Product')
      await modal.getByLabel('Manufacturer').selectOption({ index: 1 })
      await modal.getByLabel('Category').selectOption({ index: 1 })
      await modal.getByLabel('Quantity').fill('50')
      if (await modal.getByLabel('Price').isVisible()) {
        await modal.getByLabel('Price').fill('29.99')
      }
      if (await modal.getByLabel('Expiry date').isVisible()) {
        await modal.getByLabel('Expiry date').fill('2025-12-31')
      }

      // Submit the form
      await modal.getByRole('button', { name: 'Submit' }).click()

      // Wait for modal to close and verify product was created
      await expect(modal).toBeHidden()

      // Verify the new product appears in the table
      await expect(inventoryPage.page.getByText('Test Product')).toBeVisible()
    })
  })

  test.describe('Edit item', () => {
    test('should edit a product successfully', async ({ inventoryPage }) => {
      const firstRow = inventoryPage.table.getByRole('row').nth(1)
      const code = await firstRow.getByRole('cell').nth(1).textContent()
      const editButton = firstRow.getByRole('button', { name: 'Edit' })
      await editButton.click()

      const modal = await inventoryPage.getModal(`Update product ${code}`)
      await expect(modal).toBeVisible()

      await modal.getByLabel('Product Name').fill('Test Product updated')
      await modal.getByRole('button', { name: 'Submit' }).click()

      await expect(modal).toBeHidden()

      await expect(inventoryPage.page.getByText('Test Product updated')).toBeVisible()
    })
  })

  test.describe('Delete item', () => {
    test('should delete a product successfully', async ({ inventoryPage }) => {
      const firstRow = inventoryPage.table.getByRole('row').nth(1)
      const code = await firstRow.getByRole('cell').nth(1).textContent()
      const deleteButton = firstRow.getByRole('button', { name: 'Delete' })
      await deleteButton.click()

      await expect(inventoryPage.page.getByText(code!)).toBeHidden()
    })

    test('should delete multiple products successfully', async ({ inventoryPage }) => {
      const firstRow = inventoryPage.table.getByRole('row').nth(1)
      const firstRowCode = await firstRow.getByRole('cell').nth(1).textContent()
      const firstRowCheckbox = firstRow.getByRole('checkbox')

      const secondRow = inventoryPage.table.getByRole('row').nth(2)
      const secondRowCode = await secondRow.getByRole('cell').nth(1).textContent()
      const secondRowCheckbox = secondRow.getByRole('checkbox')

      await firstRowCheckbox.check()
      await secondRowCheckbox.check()

      const itemsSelectedCount = inventoryPage.page.getByText(/items selected/)
      await expect(itemsSelectedCount).toHaveText('2 items selected')
      itemsSelectedCount.locator('+ button').click()

      await expect(inventoryPage.page.getByText(firstRowCode!)).toBeHidden()
      await expect(inventoryPage.page.getByText(secondRowCode!)).toBeHidden()
    })
  })
})
