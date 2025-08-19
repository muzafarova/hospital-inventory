<template>
  <button
    class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
    @click.stop="modalOpen = true"
    aria-controls="add-product"
  >
    <svg class="fill-current shrink-0 sm:hidden" width="16" height="16" viewBox="0 0 16 16">
      <path
        d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
      />
    </svg>
    <span class="max-sm:sr-only">Add item</span>
  </button>

  <AppModal id="add-product" :modal-open="modalOpen" title="New product" @close="modalOpen = false">
    <div class="p-5">
      <InventoryForm
        v-model="newProduct"
        :submit-label="inventoryStore.adding ? 'Submitting...' : 'Submit'"
        @submit="handleCreate"
      />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useInventoryStore } from '@/stores/inventory'

import AppModal from '@/components/AppModal.vue'
import InventoryForm from './InventoryForm.vue'

const inventoryStore = useInventoryStore()
const modalOpen = ref(false)
const newProduct = ref({
  name: '',
  manufacturer: '',
  category: '',
  quantity: 10,
  price: '',
  expiresAt: null,
})

async function handleCreate() {
  await inventoryStore.addProduct(newProduct.value)
  modalOpen.value = false
}
</script>
