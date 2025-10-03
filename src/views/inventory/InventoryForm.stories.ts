import type { Meta, StoryObj } from "@storybook/vue3-vite";
import InventoryForm from "./InventoryForm.vue";
import { fn } from "storybook/test";

const meta = {
  component: InventoryForm,
  decorators: [
    () => ({
      template: `<div class="flex flex-wrap gap-8">
        <div class="max-w-md"><story /></div>
      </div>`,
    }),
  ],
  args: {
    manufacturers: ["Manufacturer 1", "Manufacturer 2", "Manufacturer 3"],
    categories: ["Category 1", "Category 2", "Category 3"],
    submitLabel: "Submit",
    onSubmit: fn(),
  },
} satisfies Meta<typeof InventoryForm>;

export default meta;

export const Default: StoryObj<typeof InventoryForm> = {
  args: {},
};

export const Prefilled: StoryObj<typeof InventoryForm> = {
  args: {
    name: "Product 1",
    manufacturer: "Manufacturer 1",
    category: "Category 1",
    quantity: 1,
    price: "100",
  },
};
