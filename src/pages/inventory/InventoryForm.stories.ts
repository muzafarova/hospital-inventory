import type { Meta, StoryObj } from "@storybook/vue3-vite";
import InventoryForm from "./InventoryForm.vue";
import type { NewProductSpec } from "@/api/endpoints";
import { ref } from "vue";
import { fn } from "storybook/test";

const meta = {
  component: InventoryForm,
} satisfies Meta<typeof InventoryForm>;

export default meta;

export const Default: StoryObj<typeof InventoryForm> = {
  render: (args) => ({
    components: { InventoryForm },
    setup() {
      const product = ref<NewProductSpec>({
        name: "",
        manufacturer: "",
        category: "",
        quantity: 1,
        price: "",
      });
      return { args, product };
    },
    template: `<InventoryForm v-bind="args" v-model="product" /><output>{{ product }}</output>`,
  }),
  args: {
    fields: ["name", "manufacturer", "category", "quantity", "price"],
    manufacturers: ["Manufacturer 1", "Manufacturer 2", "Manufacturer 3"],
    categories: ["Category 1", "Category 2", "Category 3"],
    submitLabel: "Submit",
    "onUpdate:modelValue": fn(),
    onSubmit: fn(),
  },
};
