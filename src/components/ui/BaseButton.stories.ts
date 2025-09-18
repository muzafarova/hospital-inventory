import type { Meta, StoryObj } from '@storybook/vue3-vite'

import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const meta = {
  component: BaseButton,
  argTypes: {
    size: { control: 'select', options: ['small', 'base'] },
    variant: { control: 'select', options: ['accent', 'default', 'danger', 'table'] },
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Submit',
    },
  },
  args: {},
  parameters: {
    a11y: {
      test: 'error',
    },
  },
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

// export const Table: Story = {
// }

export const Table: Story = {
  render: (args) => ({
    components: { BaseButton, BaseIcon },
    setup: () => ({ args }),
    template: `<BaseButton v-bind="args"><BaseIcon name="edit" /></BaseButton>`,
  }),
  args: {
    variant: 'table',
    default: '<BaseIcon name="edit" />',
  },
}

export const CustomLabel: Story = {
  args: {
    type: 'button',
    label: 'Create',
  },
}
