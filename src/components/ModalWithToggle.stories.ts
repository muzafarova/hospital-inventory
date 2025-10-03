import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";

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

export const OpenOnClick: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle" });
    await userEvent.click(toggle);

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(canvas.getByRole("dialog", { name: "Title" })).toBeVisible();
  },
};

export const CloseOnX: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ context, canvas, userEvent }) => {
    await OpenOnClick.play?.(context);

    const modal = canvas.getByRole("dialog", { name: "Title" });
    const closeButton = within(modal).getByRole("button", { name: "Close" });
    await userEvent.click(closeButton);

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(canvas.queryByRole("dialog", { name: "Title" })).toBeNull();
  },
};

export const CloseOnEscape: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ context, canvas, userEvent }) => {
    await OpenOnClick.play?.(context);

    await userEvent.keyboard("{Escape}");

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(canvas.queryByRole("dialog", { name: "Title" })).toBeNull();
  },
};

export const CloseOnClickOutside: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ context, canvas, userEvent }) => {
    await OpenOnClick.play?.(context);

    await userEvent.click(canvas.getByTestId("modal-backdrop"));

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    await expect(canvas.queryByRole("dialog", { name: "Title" })).toBeNull();
  },
};
