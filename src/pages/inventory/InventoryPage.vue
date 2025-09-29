<template>
  <InventoryLayout :loading="inventoryStore.loading" title="Inventory">
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
      <ProductCreate
        v-if="hospitalStore.data"
        :fields="hospitalStore.data.spec.tableColumns.map((col) => col[0])"
        :manufacturers="hospitalStore.data.spec.manufacturers"
        :categories="hospitalStore.data.spec.categories"
      />
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
        <BasePagination
          :count="inventoryStore.productsList.items.length"
          :total="inventoryStore.productsList.meta.total"
          :limit="inventoryStore.productsList.meta.limit"
          :offset="inventoryStore.productsList.meta.offset"
          :loading="inventoryStore.removing || inventoryStore.adding || inventoryStore.loading"
          @update:offset="(offset) => $router.replace({ query: { offset: offset } })"
        />
      </template>
    </InventoryTable>
  </InventoryLayout>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";

import InventoryLayout from "./InventoryLayout.vue";
import ProductCreate from "./ProductCreate.vue";
import InventoryTable from "./InventoryTable.vue";
import ProductRemoveBulk from "./ProductRemoveBulk.vue";
import BasePagination from "@/components/ui/BasePagination.vue";

import { useRoute } from "vue-router";
import { useHospitalStore } from "@/stores/hospital";
import { useInventoryStore } from "@/stores/inventory";

const route = useRoute();
const hospitalStore = useHospitalStore();
const inventoryStore = useInventoryStore();

onMounted(async () => {
  inventoryStore.clear();
  await hospitalStore.loadData();
});

watch(
  route,
  async ({ query }) => {
    // URL search params serve as source of the initial state for loadProducts' query
    await inventoryStore.loadProducts({ ...query });
  },
  { immediate: true },
);
</script>
