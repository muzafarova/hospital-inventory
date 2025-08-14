<template>
  <InventoryLayout>
    <!-- Page Heading -->
    <template v-slot:title>
      <!-- TODO pagination  -->
      <span
        v-if="inventoryStore.data"
        class="text-base font-light text-gray-500 dark:text-gray-500/60"
      >
        {{ inventoryStore.data.meta.limit * inventoryStore.data.meta.offset + 1 }} -
        {{ inventoryStore.data.products.length }} of
        {{ inventoryStore.data.meta.total.toLocaleString() }}
        total
      </span>

      <!-- Error Recovery -->
      <BaseButton
        v-else-if="inventoryStore.error"
        @click="inventoryStore.loadData()"
        size="small"
        variant="accent"
      >
        Retry
      </BaseButton>
    </template>

    <!-- Page level actions -->
    <template v-slot:actions>
      <!-- Delete button -->
      <DeleteButton :selectedItems="selectedItems" />

      <!-- Table config -->
      <InventoryConfig align="right" />

      <!-- Divider -->
      <hr class="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none self-center" />

      <!-- Add item button -->
      <button
        class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
      >
        <svg class="fill-current shrink-0 sm:hidden" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
          />
        </svg>
        <span class="max-sm:sr-only">Add item</span>
      </button>
    </template>

    <!-- Loading State -->
    <div v-if="inventoryStore.loading && inventoryStore.data === null">
      <div>Loading inventory...</div>
    </div>

    <!-- Ready State -->
    <InventoryTable
      v-else-if="inventoryStore.data"
      :products="inventoryStore.data.products"
      :total="inventoryStore.data.meta.total"
      :columns="inventoryStore.tableColumns"
    />

    <!-- Table -->
    <!-- <InvoicesTable @change-selection="updateSelectedItems($event)" /> -->
  </InventoryLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
import InventoryLayout from '@/components/LayoutInventory.vue'
import BaseButton from '@/components/library/Button.vue'
import InventoryTable from './InventoryTable.vue'
// import InvoicesTable from '@/partials/invoices/InvoicesTable.vue'
import DeleteButton from '@/partials/actions/DeleteButton.vue'
import InventoryConfig from '@/pages/inventory/InventoryConfig.vue'

const inventoryStore = computed(() => useInventoryStore())

onMounted(async () => await inventoryStore.value.loadData())

const selectedItems = ref([])

// const updateSelectedItems = (selected) => {
//   selectedItems.value = selected
// }
</script>
