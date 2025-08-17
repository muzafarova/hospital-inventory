<template>
  <InventoryLayout>
    <!-- Page Heading -->
    <template v-slot:title>
      <!-- Loading State -->
      <span v-if="inventoryStore.loading" class="inline-block mx-2">
        <svg class="animate-spin fill-current shrink-0" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
          ></path>
        </svg>
      </span>
    </template>

    <!-- Page level actions -->
    <template v-slot:actions>
      <!-- Delete button -->
      <div v-if="selectedItems.length > 0" class="flex gap-1.5">
        <BulkDeleteButton
          :loading="inventoryUpdateStore.loading"
          :selected="selectedItems"
          @delete="(ids: string[]) => inventoryUpdateStore.bulkRemoveProducts(ids)"
        />
        <!-- Divider -->
        <hr class="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none self-center" />
      </div>

      <!-- Add item button -->
      <button
        class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
        @click.stop="modalOpen = true"
        aria-controls="feedback-modal"
      >
        <svg class="fill-current shrink-0 sm:hidden" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
          />
        </svg>
        <span class="max-sm:sr-only">Add item</span>
      </button>
      <AppModal
        v-if="inventoryConfigStore.data"
        id="add-product"
        :modal-open="modalOpen"
        title="New product"
        @close="modalOpen = false"
      >
        <div class="p-5">
          <InventoryForm
            :manufacturers="inventoryConfigStore.data.manufacturers"
            :categories="inventoryConfigStore.data.categories"
          />
        </div>
      </AppModal>
    </template>

    <!-- Ready State -->
    <InventoryTable
      v-if="inventoryStore.data"
      :products="inventoryStore.data.products"
      :total="inventoryStore.data.meta.total"
      :columns="inventoryConfigStore.data?.tableColumns || []"
      @selection="(selected) => (selectedItems = selected)"
      @remove="(id: string) => inventoryUpdateStore.removeProduct(id)"
    >
      <template v-slot:pagination>
        <!-- TODO pagination  -->
        <span v-if="inventoryStore.data">
          {{ inventoryStore.data.meta.limit * inventoryStore.data.meta.offset + 1 }} -
          {{ inventoryStore.data.products.length }} of
          {{ inventoryStore.data.meta.total.toLocaleString() }}
        </span>
      </template>
    </InventoryTable>
  </InventoryLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
import { useInventorySpecStore } from '@/stores/inventory-spec'
import { useInventoryUpdateStore } from '@/stores/inventory-update'

import InventoryLayout from '@/components/LayoutInventory.vue'
import InventoryTable from './InventoryTable.vue'
import BulkDeleteButton from '@/pages/inventory/BulkDeleteButton.vue'
import AppModal from '@/components/AppModal.vue'
import InventoryForm from './InventoryForm.vue'

const inventoryStore = useInventoryStore()
const inventoryConfigStore = useInventorySpecStore()
const inventoryUpdateStore = useInventoryUpdateStore()

onBeforeMount(() => inventoryStore.clear())

onMounted(async () => {
  await inventoryStore.loadData()
  await inventoryConfigStore.loadData()
})

// Bulk actions (delete)
const selectedItems = ref<string[]>([])

const modalOpen = ref(false)
</script>
