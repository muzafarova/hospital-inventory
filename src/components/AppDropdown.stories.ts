import type { Meta, StoryObj } from '@storybook/vue3-vite'

import AppDropdown from './AppDropdown.vue'

const meta = {
  component: AppDropdown,
  argTypes: {
    align: { control: 'select', options: ['right', 'left'] },
    default: {
      control: 'text',
      description: 'Slot content',
    },
  },
  args: {
    default: 'Toggle',
  },
  decorators: [() => ({ template: '<div class="flex justify-center"><story /></div>' })],
  parameters: {
    a11y: {
      test: 'error',
    },
  },
} satisfies Meta<typeof AppDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const AlignRight: Story = {
  render: (args) => ({
    components: { AppDropdown },
    setup: () => ({ args }),
    template: `<AppDropdown v-bind="args"><div class="px-5 py-1.5">{{ args.default }}</div></AppDropdown>`,
  }),
  args: {
    label: 'Dropdown',
    default: 'Dropdown content',
    align: 'right',
  },
}

export const AlignLeft: Story = {
  render: (args) => ({
    components: { AppDropdown },
    setup: () => ({ args }),
    template: `<AppDropdown v-bind="args"><div class="px-5 py-1.5">{{ args.default }}</div></AppDropdown>`,
  }),
  args: {
    label: 'Dropdown',
    default: 'Dropdown content',
    align: 'left',
  },
}
