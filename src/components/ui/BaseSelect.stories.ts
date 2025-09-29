import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BaseSelect from "./BaseSelect.vue";

const meta = {
  component: BaseSelect,
} satisfies Meta<typeof BaseSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "select",
    label: "Label",
    options: ["Option 1", "Option 2", "Option 3"],
    modelValue: "Option 2",
  },
};
