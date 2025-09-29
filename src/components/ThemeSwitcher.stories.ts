import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import ThemeSwitcher from "./ThemeSwitcher.vue";

const meta = {
  component: ThemeSwitcher,
  tags: ["!autodocs"],
  parameters: {
    a11y: {
      test: "error",
    },
  },
  decorators: [() => ({ template: '<div class="flex justify-center"><story /></div>' })],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Theme" }));
    await userEvent.click(canvas.getByRole("menuitem", { name: /dark/i }));
    await userEvent.click(document.body);

    await expect(document.documentElement).toHaveClass("dark");
  },
};

export const Light: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Theme" }));
    await userEvent.click(canvas.getByRole("menuitem", { name: /light/i }));
    await userEvent.click(document.body);

    await expect(document.documentElement).not.toHaveClass("dark");
  },
};

export const System: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Theme" }));
    await userEvent.click(canvas.getByRole("menuitem", { name: /system/i }));
    await userEvent.click(document.body);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      await expect(document.documentElement).toHaveClass("dark");
    } else {
      await expect(document.documentElement).not.toHaveClass("dark");
    }
  },
};
