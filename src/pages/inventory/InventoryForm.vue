<template>
  <form @submit.prevent="handleSubmit">
    <div class="p-5">
      <div class="space-y-5">
        <BaseInput label="Product Name" id="name" required autocomplete="off" v-model="nameModel" />
        <BaseSelect
          label="Manufacturer"
          id="manufacturer"
          required
          :options="manufacturers"
          v-model="manufacturerModel"
        />
        <BaseSelect
          label="Category"
          id="category"
          required
          :options="categories"
          v-model="categoryModel"
        />
        <div class="grid gap-4 md:grid-cols-2">
          <BaseInput
            label="Quantity"
            id="quantity"
            required
            type="number"
            min="1"
            autocomplete="off"
            v-model.number="quantityModel"
          />
          <BaseInput
            label="Price, £"
            id="price"
            min="0"
            required
            autocomplete="off"
            v-model="priceModel"
          />
        </div>
      </div>
    </div>

    <div class="mt-5 flex flex-col border-t border-gray-200 px-6 py-5 dark:border-gray-700/60">
      <div class="flex justify-end">
        <BaseButton type="submit" variant="accent">{{ submitLabel }}</BaseButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseInput from "@/components/ui/form/BaseInput.vue";
import BaseSelect from "@/components/ui/form/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

withDefaults(
  defineProps<{
    manufacturers: string[];
    categories: string[];
    submitLabel: string;
    name?: string;
    manufacturer?: string;
    category?: string;
    quantity?: number;
    price?: string;
  }>(),
  { submitLabel: "Submit" },
);

const emits = defineEmits<{
  submit: [
    data: { name: string; manufacturer: string; category: string; quantity: number; price: string },
  ];
}>();

const nameModel = defineModel<string>("name");
const manufacturerModel = defineModel<string>("manufacturer");
const categoryModel = defineModel<string>("category");
const quantityModel = defineModel<number>("quantity");
const priceModel = defineModel<string>("price");

function handleSubmit(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  emits("submit", {
    name: formData.get("name") as string,
    manufacturer: formData.get("manufacturer") as string,
    category: formData.get("category") as string,
    quantity: Number(formData.get("quantity") as string),
    price: formData.get("price") as string,
  });
}
</script>
