<template>
  <InventoryLayout>
    <!-- Loading State -->
    <div v-if="inventoryStore.loading && inventoryStore.data === null">
      <div>Loading inventory...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="inventoryStore.error">
      <div>{{ inventoryStore.error }}</div>
      <button @click="inventoryStore.loadData()" class="btn btn-sm">Retry</button>
    </div>

    <!-- Inventory Table -->
    <div v-else-if="inventoryStore.data">
      <div>
        <h2>
          Products {{ inventoryStore.data.products.length }} ({{
            inventoryStore.data.meta.total.toLocaleString()
          }}
          total)
        </h2>
      </div>

      <div>
        <table width="100%" class="text-left">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Manufacturer</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in inventoryStore.data.products" :key="product.id">
              <td>
                {{ product.name }}
              </td>
              <td>
                {{ product.manufacturer }}
              </td>
              <td>
                <span>
                  {{ product.category }}
                </span>
              </td>
              <td>
                {{ product.quantity }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="mt-8">
          <PaginationClassic
            :total="inventoryStore.data.meta.total"
            :count="inventoryStore.data.products.length"
          />
        </div>
      </div>
    </div>
  </InventoryLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
import InventoryLayout from '@/components/LayoutInventory.vue'
import PaginationClassic from '@/components/vendor/PaginationClassic.vue'

const inventoryStore = computed(() => useInventoryStore())

onMounted(async () => await inventoryStore.value.loadData())
</script>
