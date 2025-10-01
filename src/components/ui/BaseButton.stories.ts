import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";

const meta = {
  component: BaseButton,
  argTypes: {
    size: { control: "select", options: ["small", "base"] },
    variant: { control: "select", options: ["accent", "default", "danger", "inline"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    default: {
      control: "text",
      description: "Slot content",
    },
  },
  args: {
    default: "Submit",
  },
  parameters: {
    a11y: {
      test: "error",
    },
  },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SizeXs: Story = {
  args: {
    size: "xs",
  },
};

export const SizeSmall: Story = {
  args: {
    size: "small",
  },
};

export const SizeLarge: Story = {
  args: {
    size: "large",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Inline: Story = {
  parameters: {
    docs: {
      description: {
        story: "Frameless button with text or icon to be used in a table",
      },
    },
  },
  render: (args) => ({
    components: { BaseButton, BaseIcon },
    setup: () => ({ args }),
    template: `<BaseButton v-bind="args"><BaseIcon name="edit" /></BaseButton>`,
  }),
  args: {
    variant: "inline",
    default: '<BaseIcon name="edit" />',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: `<BaseButton v-bind="args" disabled>Submit</BaseButton>`,
  }),
  args: {},
};
