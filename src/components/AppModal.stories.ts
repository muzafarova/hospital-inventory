import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { expect, within } from 'storybook/test'

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

export const CloseOnX: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvas, userEvent }) => {
    const modal = canvas.getByRole('dialog', { name: 'Title' })
    const closeButton = within(modal).getByRole('button', { name: 'Close' })
    await userEvent.click(closeButton)

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300))

    await expect(canvas.queryByRole('dialog', { name: 'Title' })).toBeNull()
  },
}

export const CloseOnEscape: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.keyboard('{Escape}')

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300))

    await expect(canvas.queryByRole('dialog', { name: 'Title' })).toBeNull()
  },
}

export const CloseOnClickOutside: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId('modal-backdrop'))

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300))

    await expect(canvas.queryByRole('dialog', { name: 'Title' })).toBeNull()
  },
}
