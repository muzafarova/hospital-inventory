<template>
  <AppModalWithToggle
    modal-id="add-product"
    modal-title="New product"
    toggle-title="Add item"
    toggle-variant="accent"
    v-slot="slotProps"
  >
    <InventoryForm
      v-model="newProduct"
      :fields="fields"
      :manufacturers="manufacturers"
      :categories="categories"
      :submit-label="inventoryStore.adding ? 'Submitting...' : 'Submit'"
      @submit="
        async () => {
          await inventoryStore.addProduct(newProduct);
          slotProps.close();
          newProduct = DEFAULT;
        }
      "
    />
  </AppModalWithToggle>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useInventoryStore } from "@/stores/inventory";

import AppModalWithToggle from "@/components/AppModalWithToggle.vue";
import InventoryForm from "./InventoryForm.vue";

defineProps<{
  fields: string[];
  manufacturers: string[];
  categories: string[];
}>();

const inventoryStore = useInventoryStore();
const DEFAULT = {
  name: "",
  manufacturer: "",
  category: "",
  quantity: 10,
  price: "",
  expiresAt: null,
};
const newProduct = ref(DEFAULT);
</script>
