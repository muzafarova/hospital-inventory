import type { Meta, StoryObj } from '@storybook/vue3-vite'

import ThemeSwitcher from './ThemeSwitcher.vue'

const meta = {
  component: ThemeSwitcher,
  parameters: {
    a11y: {
      test: 'error',
    },
  },
  decorators: [() => ({ template: '<div class="flex justify-center"><story /></div>' })],
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
