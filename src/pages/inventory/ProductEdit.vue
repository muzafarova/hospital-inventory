<template>
  <button
    class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
    @click.stop="modalOpen = true"
    aria-controls="add-product"
  >
    <span class="sr-only">Edit</span>
    <svg viewBox="0 0 16 16" fill="currentColor" class="size-5">
      <path
        fill-rule="evenodd"
        d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  <AppModal id="add-product" :modal-open="modalOpen" title="New product" @close="modalOpen = false">
    <div class="p-5">
      <InventoryForm
        v-model="localValue"
        :submit-label="inventoryStore.editing ? 'Submitting...' : 'Submit'"
        @submit="handleUpdate"
      />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Product from '@/entities/product'
import { useInventoryStore } from '@/stores/inventory'

import AppModal from '@/components/AppModal.vue'
import InventoryForm from './InventoryForm.vue'

const props = defineProps<{ product: Product }>()
const inventoryStore = useInventoryStore()
const modalOpen = ref(false)
const localValue = ref(props.product)

async function handleUpdate() {
  await inventoryStore.editProduct(localValue.value)
  modalOpen.value = false
}
</script>
