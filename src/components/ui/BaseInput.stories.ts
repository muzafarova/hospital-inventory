import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BaseInput from "./BaseInput.vue";

const meta = {
  component: BaseInput,
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "input-default",
  },
};

export const Prefilled: Story = {
  parameters: {
    docs: {
      source: {
        code: '<BaseInput id="input-prefilled" label="Label" required modelValue="initial value" />',
      },
    },
  },
  args: {
    id: "input-prefilled",
    label: "Label",
    required: true,
    modelValue: "initial value",
  },
};

export const Label: Story = {
  args: {
    id: "input-label",
    label: "Label",
  },
};

export const Required: Story = {
  args: {
    id: "input-required",
    required: true,
  },
};

export const TypeEmail: Story = {
  args: {
    id: "input-type-email",
    type: "email",
  },
};

export const TypeNumber: Story = {
  args: {
    id: "input-type-number",
    type: "number",
  },
};

export const TypePassword: Story = {
  args: {
    id: "input-type-password",
    type: "password",
  },
};

export const TypeSearch: Story = {
  args: {
    id: "input-type-search",
    type: "search",
  },
};

export const TypeTel: Story = {
  args: {
    id: "input-type-tel",
    type: "tel",
  },
};

export const TypeUrl: Story = {
  args: {
    id: "input-type-url",
    type: "url",
  },
};
