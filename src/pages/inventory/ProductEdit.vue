<template>
  <AppModalWithToggle
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
        v-model="localValue"
        :fields="hospitalStore.data.spec.tableColumns.map((col) => col[0])"
        :manufacturers="hospitalStore.data.spec.manufacturers"
        :categories="hospitalStore.data.spec.categories"
        :submit-label="inventoryStore.editing ? 'Submitting...' : 'Submit'"
        @submit="
          async () => {
            await inventoryStore.editProduct(localValue);
            slotProps.close();
            emits('update');
          }
        "
      />
    </template>
  </AppModalWithToggle>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Product from "@/entities/product";
import { useInventoryStore } from "@/stores/inventory";
import { useHospitalStore } from "@/stores/hospital";

import AppModalWithToggle from "@/components/AppModalWithToggle.vue";
import InventoryForm from "./InventoryForm.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

const props = defineProps<{ product: Product }>();
const emits = defineEmits<{ update: [] }>();

const hospitalStore = useHospitalStore();
const inventoryStore = useInventoryStore();

const localValue = ref(props.product);
</script>
