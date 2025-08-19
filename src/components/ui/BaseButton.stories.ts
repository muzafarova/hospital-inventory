import type { Meta, StoryObj } from '@storybook/vue3-vite'

import BaseButton from './BaseButton.vue'

const meta = {
  component: BaseButton,
  argTypes: {
    size: { control: 'select', options: ['small', 'base'] },
    variant: { control: 'select', options: ['accent', 'default', 'danger'] },
  },
  args: {},
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}

export const CustomLabel: Story = {
  args: {
    type: 'button',
    label: 'Create',
  },
}
