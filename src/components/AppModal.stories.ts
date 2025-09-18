import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import AppModal from './AppModal.vue'

const meta = {
  render: (args) => ({
    components: { AppModal },
    setup: () => {
      const modalOpen = ref(false)
      return { args, modalOpen }
    },
    template: `<AppModal v-bind="args" @close="args.modalOpen = false"><div class="p-5">{{ args.default }}</div></AppModal>`,
  }),
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
    },
    modalOpen: {
      control: 'boolean',
      description: 'Modal open',
    },
  },
  decorators: [() => ({ template: '<div class="min-h-40"><story /></div>' })],
  parameters: {
    a11y: {
      test: 'error',
    },
  },
} satisfies Meta<typeof AppModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'modal_1',
    title: 'Title',
    modalOpen: true,
    default: 'Slot content',
  },
}
