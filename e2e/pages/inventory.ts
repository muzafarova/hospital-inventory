import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'
import { LoggedInPage } from './logged-in.js'

export class InventoryPage extends LoggedInPage {
  readonly buttonAddItem: Locator

  // Form field locators
  readonly inputProductName: Locator
  readonly selectManufacturer: Locator
  readonly selectCategory: Locator
  readonly inputQuantity: Locator
  readonly inputPrice: Locator
  readonly inputExpiryDate: Locator
  readonly buttonSubmit: Locator

  constructor(public readonly page: Page) {
    super(page)
    this.buttonAddItem = this.page.getByRole('button', { name: 'Add item' })

    // Initialize form field locators
    this.inputProductName = this.page.getByLabel('Product Name')
    this.selectManufacturer = this.page.getByLabel('Manufacturer')
    this.selectCategory = this.page.getByLabel('Category')
    this.inputQuantity = this.page.getByLabel('Quantity')
    this.inputPrice = this.page.getByLabel('Price')
    this.inputExpiryDate = this.page.getByLabel('Expiry date')
    this.buttonSubmit = this.page.getByRole('button', { name: 'Submit' })
  }

  async expectInventoryPage() {
    await expect(this.page.getByRole('heading', { name: 'Inventory', level: 2 })).toBeVisible()
  }

  async expectInventoryTable() {
    await expect(this.page.getByRole('heading', { name: 'Products', level: 3 })).toBeVisible()
  }

  async expectModalVisible(title: string) {
    await expect(this.page.getByRole('dialog', { name: title })).toBeVisible()
  }

  get activeModal() {
    return this.page.getByRole('dialog', { includeHidden: false })
  }

  async logout() {
    await super.logout()
  }
}
