<template>
  <ModalWithToggle
    modal-id="add-product"
    modal-title="New product"
    toggle-title="Add item"
    toggle-variant="accent"
    v-slot="slotProps"
  >
    <InventoryFormWrapper>
      <template v-slot="{ manufacturers, categories }">
        <InventoryForm
          :manufacturers="manufacturers"
          :categories="categories"
          :submit-label="inventoryStore.adding ? 'Submitting...' : 'Submit'"
          @submit="
            async (newProduct) => {
              await inventoryStore.addProduct(newProduct);
              slotProps.close();
            }
          "
        />
      </template>
    </InventoryFormWrapper>
  </ModalWithToggle>
</template>

<script setup lang="ts">
import { useInventoryStore } from "@/stores/inventory";

import ModalWithToggle from "@/components/ModalWithToggle.vue";
import InventoryForm from "./form/InventoryForm.vue";
import InventoryFormWrapper from "./form/InventoryFormWrapper.vue";

const inventoryStore = useInventoryStore();
</script>
