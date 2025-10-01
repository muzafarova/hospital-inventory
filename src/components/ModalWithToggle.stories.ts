import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ModalWithToggle from "./ModalWithToggle.vue";

const meta = {
  component: ModalWithToggle,
  render: (args) => ({
    components: { ModalWithToggle },
    setup: () => ({ args }),
    template: `<ModalWithToggle v-bind="args">{{ args.default }}</ModalWithToggle>`,
  }),
  argTypes: {
    default: {
      control: "text",
      description: "Modal's inner content",
    },
    toggleVariant: {
      control: "select",
      options: ["accent", "default", "danger", "inline"],
    },
  },
  decorators: [() => ({ template: '<div class="min-h-40"><story /></div>' })],
  parameters: {
    a11y: {
      test: "error",
    },
  },
} satisfies Meta<typeof ModalWithToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modalId: "modal_1",
    modalTitle: "Title",
    toggleTitle: "Toggle",
    toggleVariant: "default",
    default: "Slot content",
  },
};
