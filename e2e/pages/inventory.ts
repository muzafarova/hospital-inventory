import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'
import { LoggedInPage } from './logged-in.js'

export class InventoryPage extends LoggedInPage {
  // Create new record button
  readonly buttonCreate: Locator

  // Table elements
  readonly tableHeading: Locator
  readonly table: Locator
  readonly theadCheckbox: Locator
  readonly tbodyCheckboxes: Locator

  constructor(public readonly page: Page) {
    super(page)
    this.tableHeading = this.page.getByRole('heading', { name: 'Products', level: 3 })
    this.table = this.page.getByRole('table')
    this.theadCheckbox = this.table.getByRole('checkbox').first()
    this.tbodyCheckboxes = this.table.locator('tbody').getByRole('checkbox')
    this.buttonCreate = this.page.getByRole('button', { name: 'Add item' })
  }

  async expectHeading() {
    await super.expectHeading('Inventory')
  }

  async expectInventoryTable() {
    await expect(this.tableHeading).toBeVisible()
    await expect(this.table).toBeVisible()
  }

  async expectButtonCreateVisible() {
    await expect(this.buttonCreate).toBeVisible()
  }

  async getModal(title: string) {
    return this.page.getByRole('dialog', { includeHidden: true, name: title })
  }

  async logout() {
    await super.logout()
  }
}
