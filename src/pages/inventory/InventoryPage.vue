<template>
  <InventoryLayout :loading="inventoryStore.loading">
    <!-- Page level actions -->
    <template v-slot:actions>
      <!-- Bulk-delete button -->
      <ProductRemoveBulk
        v-if="inventoryStore.selectedProducts.length > 0"
        :loading="inventoryStore.removing"
        :selected="inventoryStore.selectedProducts"
        @delete="(ids: string[]) => inventoryStore.bulkRemoveProducts(ids)"
      />

      <!-- Add button & modal -->
      <ProductCreate
        v-if="inventoryConfigStore.data"
        :manufacturers="inventoryConfigStore.data.manufacturers"
        :categories="inventoryConfigStore.data.categories"
      />
    </template>

    <!-- List view -->
    <InventoryTable
      v-if="inventoryStore.data"
      :products="inventoryStore.data.products"
      :total="inventoryStore.data.meta.total"
      :columns="inventoryConfigStore.data?.tableColumns || []"
      @selection="inventoryStore.updateSelection"
      @remove="inventoryStore.removeProduct"
    >
      <template v-slot:pagination>
        <span> {{ inventoryStore.stats }} </span>
        <!-- TODO implenment back/forward pagination  -->
      </template>
    </InventoryTable>
  </InventoryLayout>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
import { useInventorySpecStore } from '@/stores/inventory-spec'

import InventoryLayout from '@/components/LayoutInventory.vue'
import ProductCreate from './ProductCreate.vue'
import InventoryTable from './InventoryTable.vue'
import ProductRemoveBulk from './ProductRemoveBulk.vue'

const inventoryStore = useInventoryStore()
const inventoryConfigStore = useInventorySpecStore()

onBeforeMount(() => inventoryStore.clear())

onMounted(async () => {
  await inventoryStore.loadProducts()
  await inventoryConfigStore.loadData()
})
</script>
