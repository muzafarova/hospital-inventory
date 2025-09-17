import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export class InventoryPage {
  private readonly topNav: Locator
  private readonly buttonProfile: Locator
  readonly buttonAddItem: Locator

  constructor(public readonly page: Page) {
    this.topNav = this.page.getByRole('banner')
    this.buttonProfile = this.topNav.getByRole('button')
    this.buttonAddItem = this.page.getByRole('button', { name: 'Add item' })
  }

  async expectInventoryPage() {
    await expect(this.page.getByRole('heading', { name: 'Inventory' })).toBeVisible()
  }

  async expectInventoryTable() {
    await expect(this.page.getByRole('heading', { name: 'Products' })).toBeVisible()
  }

  async expectModalVisible(title: string) {
    await expect(this.page.getByText(title)).toBeVisible()
  }

  async logout() {
    await this.buttonProfile.click()
    await this.topNav.getByRole('button', { name: 'Sign Out' }).click()
    await expect(this.page).toHaveURL('/login')
  }
}
