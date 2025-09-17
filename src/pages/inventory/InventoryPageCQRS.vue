<template>
  <InventoryLayout :loading="inventoryStore.isLoading">
    <!-- Page level actions -->
    <template v-slot:actions>
      <!-- Bulk-delete button -->
      <ProductRemoveBulk
        v-if="selectedProducts.length > 0"
        :loading="inventoryStore.deleting"
        :selected="selectedProducts"
        @delete="(ids: string[]) => inventoryStore.deleteProducts(ids)"
      />

      <!-- Add button & modal -->
      <ProductCreate v-if="hospitalStore.data" />
    </template>

    <!-- List view -->
    <InventoryTable
      v-if="inventoryStore.productList"
      :products="inventoryStore.productList.items"
      :total="inventoryStore.productList.pagination.total"
      :columns="hospitalStore.data?.spec.tableColumns || []"
      @selection="updateSelection"
      @remove="(id: string) => inventoryStore.deleteProducts([id])"
    >
      <template v-slot:pagination>
        <span>{{ paginationStats }}</span>
        <!-- TODO implement back/forward pagination -->
      </template>
    </InventoryTable>

    <!-- Stats Dashboard -->
    <div v-if="inventoryStore.productStats" class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Total Products</h3>
        <p class="text-2xl font-bold text-gray-900">{{ inventoryStore.productStats.totalProducts }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Total Value</h3>
        <p class="text-2xl font-bold text-gray-900">${{ inventoryStore.productStats.totalValue.toLocaleString() }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Low Stock</h3>
        <p class="text-2xl font-bold text-red-600">{{ inventoryStore.productStats.lowStockCount }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-sm font-medium text-gray-500">Expiring Soon</h3>
        <p class="text-2xl font-bold text-yellow-600">{{ inventoryStore.productStats.expiringSoonCount }}</p>
      </div>
    </div>
  </InventoryLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useInventoryCQRSStore } from '@/stores/inventory-cqrs'
import { useHospitalStore } from '@/stores/hospital'

import InventoryLayout from '@/components/LayoutInventory.vue'
import ProductCreate from './ProductCreate.vue'
import InventoryTable from './InventoryTable.vue'
import ProductRemoveBulk from './ProductRemoveBulk.vue'

const inventoryStore = useInventoryCQRSStore()
const hospitalStore = useHospitalStore()
const route = useRoute()

const selectedProducts = ref<string[]>([])

const paginationStats = computed(() => {
  if (!inventoryStore.productList) return ''
  const { pagination } = inventoryStore.productList
  return `${pagination.offset + 1} - ${pagination.offset + pagination.limit} of ${pagination.total.toLocaleString()}`
})

function updateSelection(selected: string[]) {
  selectedProducts.value = selected
}

// Load data on mount
onMounted(async () => {
  // Load products with query parameters
  await inventoryStore.loadProducts({
    limit: Number(route.query.limit) || 100,
    offset: Number(route.query.offset) || 0,
    name: route.query.name as string || '',
  })
  
  // Load stats
  await inventoryStore.loadStats({})
})
</script>