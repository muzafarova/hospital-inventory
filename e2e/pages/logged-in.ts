import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export class LoggedInPage {
  private readonly topNav: Locator
  private readonly buttonProfile: Locator

  constructor(public readonly page: Page) {
    this.topNav = this.page.getByRole('banner')
    this.buttonProfile = this.topNav.getByRole('button', { name: 'Profile' })
  }

  async expectButtonProfileVisible() {
    await expect(this.buttonProfile).toBeVisible()
  }

  async logout() {
    await this.buttonProfile.click()
    await this.topNav.getByRole('button', { name: 'Sign Out' }).click()
    await expect(this.page).toHaveURL('/login')
  }
}
