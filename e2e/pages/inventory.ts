import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export class InventoryPage {
  private readonly topNav: Locator
  private readonly buttonProfile: Locator
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
    this.topNav = this.page.getByRole('banner')
    this.buttonProfile = this.topNav.getByRole('button', { name: 'Profile' })
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
    await expect(this.page.getByRole('heading', { name: 'Inventory' })).toBeVisible()
  }

  async expectInventoryTable() {
    await expect(this.page.getByRole('heading', { name: 'Products' })).toBeVisible()
  }

  async expectModalVisible(title: string) {
    await expect(this.page.getByRole('dialog', { name: title })).toBeVisible()
  }

  get activeModal() {
    return this.page.getByRole('dialog', { includeHidden: false })
  }

  async logout() {
    await this.buttonProfile.click()
    await this.topNav.getByRole('button', { name: 'Sign Out' }).click()
    await expect(this.page).toHaveURL('/login')
  }
}
