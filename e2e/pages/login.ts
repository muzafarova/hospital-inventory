import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export class LoginPage {
  private readonly inputUsername: Locator
  private readonly inputPassword: Locator
  private readonly buttonSubmit: Locator

  constructor(public readonly page: Page) {
    this.inputUsername = this.page.getByLabel('Username')
    this.inputPassword = this.page.getByLabel('Password')
    this.buttonSubmit = this.page.getByRole('button', { name: 'Sign in' })
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(username: string, password: string) {
    await this.inputUsername.fill(username)
    await this.inputPassword.fill(password)
    await this.buttonSubmit.click()
  }

  async expectToBeVisible() {
    await expect(this.page.getByRole('heading', { name: 'Hospital Inventory' })).toBeVisible()
    await expect(this.inputUsername).toBeVisible()
    await expect(this.inputPassword).toBeVisible()
    await expect(this.buttonSubmit).toBeVisible()
  }

  async expectLoginError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible()
    await expect(this.page).toHaveURL('/login')
  }
}
