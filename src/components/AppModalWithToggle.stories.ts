import type { Meta, StoryObj } from '@storybook/vue3-vite'

import AppModalWithToggle from './AppModalWithToggle.vue'

const meta = {
  render: (args) => ({
    components: { AppModalWithToggle },
    setup: () => ({ args }),
    template: `<AppModalWithToggle v-bind="args">{{ args.default }}</AppModalWithToggle>`,
  }),
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
    },
    toggleVariant: {
      control: 'select',
      options: ['accent', 'default', 'danger', 'inline'],
    },
  },
  decorators: [() => ({ template: '<div class="min-h-40"><story /></div>' })],
  parameters: {
    a11y: {
      test: 'error',
    },
  },
} satisfies Meta<typeof AppModalWithToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modalId: 'modal_1',
    modalTitle: 'Title',
    toggleTitle: 'Toggle',
    toggleVariant: 'default',
    default: 'Slot content',
  },
}
