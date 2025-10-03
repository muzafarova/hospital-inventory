<template>
  <ModalWithToggle
    v-if="hospitalStore.data"
    :modal-id="product.id"
    :modal-title="`Update product ${product.code}`"
    toggle-title="Edit"
    toggle-variant="inline"
    toggle-size="xs"
  >
    <template v-slot:button><BaseIcon name="edit" /></template>
    <template v-slot:default="slotProps">
      <InventoryForm
        :name="product.name"
        :manufacturer="product.manufacturer"
        :category="product.category"
        :quantity="product.quantity"
        :price="product.price"
        :manufacturers="hospitalStore.data.spec.manufacturers"
        :categories="hospitalStore.data.spec.categories"
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
  </ModalWithToggle>
</template>

<script setup lang="ts">
import Product from "@/entities/product";
import { useInventoryStore } from "@/stores/inventory";
import { useHospitalStore } from "@/stores/hospital";

import ModalWithToggle from "@/components/ModalWithToggle.vue";
import InventoryForm from "./InventoryForm.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

const props = defineProps<{ product: Product }>();
const emits = defineEmits<{ update: [] }>();

const hospitalStore = useHospitalStore();
const inventoryStore = useInventoryStore();
</script>
