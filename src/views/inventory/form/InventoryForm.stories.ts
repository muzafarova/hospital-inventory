import type { Meta, StoryObj } from "@storybook/vue3-vite";
import InventoryForm from "./InventoryForm.vue";
import { fn, within, expect, userEvent } from "storybook/test";

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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const form = canvas.getByRole("form");
    const nameInput = canvas.getByLabelText(/name/i);
    const manufacturerInput = canvas.getByLabelText(/manufacturer/i);
    const categoryInput = canvas.getByLabelText(/category/i);
    const quantityInput = canvas.getByLabelText(/quantity/i);
    const priceInput = canvas.getByLabelText(/price/i);
    const submitButton = canvas.getByRole("button", { name: "Submit" });

    await expect(form).toBeVisible();
    await expect(form).toBeEnabled();

    await expect(nameInput).toBeVisible();
    await expect(nameInput).toBeEnabled();

    await expect(manufacturerInput).toBeVisible();
    await expect(manufacturerInput).toBeEnabled();

    await expect(categoryInput).toBeVisible();
    await expect(categoryInput).toBeEnabled();

    await expect(quantityInput).toBeVisible();
    await expect(quantityInput).toBeEnabled();

    await expect(priceInput).toBeVisible();
    await expect(priceInput).toBeEnabled();

    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    await expect(form).toBeInvalid();
    await expect(args.onSubmit).not.toHaveBeenCalled();
    await expect(nameInput).toHaveFocus();
  },
};

export const Filled: StoryObj<typeof InventoryForm> = {
  args: {},
  play: async ({ context, args, canvasElement }) => {
    await Default.play?.(context);

    const canvas = within(canvasElement);
    const form = canvas.getByRole("form");
    const nameInput = canvas.getByLabelText(/name/i);
    const manufacturerInput = canvas.getByLabelText(/manufacturer/i);
    const categoryInput = canvas.getByLabelText(/category/i);
    const quantityInput = canvas.getByLabelText(/quantity/i);
    const priceInput = canvas.getByLabelText(/price/i);
    const submitButton = canvas.getByRole("button", { name: "Submit" });

    await userEvent.type(nameInput, "Product 1");
    await userEvent.selectOptions(manufacturerInput, "Manufacturer 1");
    await userEvent.selectOptions(categoryInput, "Category 1");
    await userEvent.type(quantityInput, "1");
    await userEvent.type(priceInput, "100");
    await expect(form).toBeValid();
    await userEvent.click(submitButton);
    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: "Product 1",
      manufacturer: "Manufacturer 1",
      category: "Category 1",
      quantity: 1,
      price: "100",
    });
  },
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
