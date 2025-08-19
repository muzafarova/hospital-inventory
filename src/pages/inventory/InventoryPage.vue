<template>
  <InventoryLayout :loading="inventoryStore.loading">
    <!-- Page level actions -->
    <template v-slot:actions>
      <!-- Bulk-delete button -->
      <ProductRemoveBulk
        v-if="inventoryStore.productsSelection.length > 0"
        :loading="inventoryStore.removing"
        :selected="inventoryStore.productsSelection"
        @delete="(ids: string[]) => inventoryStore.bulkRemoveProducts(ids)"
      />

      <!-- Add button & modal -->
      <ProductCreate v-if="hospitalStore.data" />
    </template>

    <!-- List view -->
    <InventoryTable
      v-if="inventoryStore.productsList"
      :products="inventoryStore.productsList.items"
      :total="inventoryStore.productsList.meta.total"
      :columns="hospitalStore.data?.spec.tableColumns || []"
      @selection="inventoryStore.updateSelection"
      @remove="inventoryStore.removeProduct"
    >
      <template v-slot:pagination>
        <span> {{ inventoryStore.productStats }} </span>
        <!-- TODO implenment back/forward pagination  -->
      </template>
    </InventoryTable>
  </InventoryLayout>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useInventoryStore } from '@/stores/inventory'
import { useHospitalStore } from '@/stores/hospital'

import InventoryLayout from '@/components/LayoutInventory.vue'
import ProductCreate from './ProductCreate.vue'
import InventoryTable from './InventoryTable.vue'
import ProductRemoveBulk from './ProductRemoveBulk.vue'

const inventoryStore = useInventoryStore()
const hospitalStore = useHospitalStore()
const route = useRoute()

onBeforeMount(async () => inventoryStore.clear())

// URL search params serve as source of the initial state for loadProducts' query
onMounted(async () => await inventoryStore.loadProducts({ ...route.query }))
</script>
