import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BaseDropdown from "./BaseDropdown.vue";

const meta = {
  component: BaseDropdown,
  argTypes: {
    align: { control: "select", options: ["right", "left"] },
    default: {
      control: "text",
      description: "Slot content",
    },
  },
  args: {
    default: "Toggle",
  },
  decorators: [() => ({ template: '<div class="flex justify-center"><story /></div>' })],
  parameters: {
    a11y: {
      test: "error",
    },
  },
} satisfies Meta<typeof BaseDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlignRight: Story = {
  render: (args) => ({
    components: { BaseDropdown },
    setup: () => ({ args }),
    template: `<BaseDropdown v-bind="args"><div class="px-5 py-1.5">{{ args.default }}</div></BaseDropdown>`,
  }),
  args: {
    label: "Dropdown",
    default: "Dropdown content",
    align: "right",
  },
};

export const AlignLeft: Story = {
  render: (args) => ({
    components: { BaseDropdown },
    setup: () => ({ args }),
    template: `<BaseDropdown v-bind="args"><div class="px-5 py-1.5">{{ args.default }}</div></BaseDropdown>`,
  }),
  args: {
    label: "Dropdown",
    default: "Dropdown content",
    align: "left",
  },
};
