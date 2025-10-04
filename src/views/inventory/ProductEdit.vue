<template>
  <ModalWithToggle
    :modal-id="product.id"
    :modal-title="`Update product ${product.code}`"
    toggle-title="Edit"
    toggle-variant="inline"
    toggle-size="xs"
  >
    <template v-slot:button><BaseIcon name="edit" /></template>
    <template v-slot:default="slotProps">
      <InventoryFormWrapper>
        <template v-slot="{ manufacturers, categories }">
          <InventoryForm
            :name="product.name"
            :manufacturer="product.manufacturer"
            :category="product.category"
            :quantity="product.quantity"
            :price="product.price"
            :manufacturers="manufacturers"
            :categories="categories"
            :submit-label="inventoryStore.editing ? 'Submitting...' : 'Submit'"
            @submit="
              async (data) => {
                await inventoryStore.editProduct({ ...props.product, ...data });
                slotProps.close();
                emits('update');
              }
            "
          />
        </template>
      </InventoryFormWrapper>
    </template>
  </ModalWithToggle>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/ui/BaseIcon.vue";
import ModalWithToggle from "@/components/ModalWithToggle.vue";
import InventoryForm from "./InventoryForm.vue";
import InventoryFormWrapper from "./InventoryFormWrapper.vue";

import Product from "@/entities/product";
import { useInventoryStore } from "@/stores/inventory";

const props = defineProps<{ product: Product }>();
const emits = defineEmits<{ update: [] }>();

const inventoryStore = useInventoryStore();
</script>
