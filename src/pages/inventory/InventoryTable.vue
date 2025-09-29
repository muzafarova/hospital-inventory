<template>
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
    <header class="flex justify-between items-stretch px-5 py-4">
      <h3 class="font-semibold text-gray-800 dark:text-gray-100">Products</h3>
      <span class="text-gray-400 dark:text-gray-500 font-medium inline-block ml-1">
        <slot name="pagination" />
      </span>
    </header>

    <!-- <div class="overflow-x-auto"> -->
    <table v-if="total > 0" width="100%" class="table-auto w-full dark:text-gray-300">
      <thead
        class="text-sm font-semibold text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/85 border-t border-b border-gray-100 dark:border-gray-700/85 sticky top-15 z-20"
      >
        <tr class="">
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
            <div class="flex items-center">
              <label class="inline-flex">
                <span class="sr-only">Select all</span>
                <input
                  class="form-checkbox"
                  type="checkbox"
                  v-model="localSelectAll"
                  @click="toggleAll"
                />
              </label>
            </div>
          </th>
          <th
            class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"
            v-for="column of columns"
            :key="column[0]"
          >
            <div
              class="font-semibold text-left"
              :class="{ 'text-right': ['price', 'quantity'].includes(column[0]) }"
            >
              {{ column[1] }}
            </div>
          </th>
          <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="font-semibold text-left">Actions</div>
          </th>
        </tr>
      </thead>
      <tbody class="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
        <InventoryTableRow
          v-for="product in products"
          :key="product.id"
          :product="product"
          :columns="columns"
          class="hover:bg-gray-50 dark:hover:bg-gray-50/5"
          @remove="emits('remove', $event)"
          ><template v-slot:select>
            <div class="flex items-center">
              <label class="inline-flex">
                <span class="sr-only">Select</span>
                <input
                  :id="product.id"
                  v-model="localSelected"
                  class="form-checkbox"
                  type="checkbox"
                  :value="product.id"
                />
              </label>
            </div>
          </template>
        </InventoryTableRow>
      </tbody>
    </table>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Product from '@/entities/product'
import InventoryTableRow from './InventoryTableRow.vue'

const porps = defineProps<{
  total: number
  limit?: number
  offset?: number
  products: Product[]
  columns: [keyof Product, string][]
}>()

const emits = defineEmits<{ selection: [value: string[]]; remove: [value: string] }>()

const localSelected = ref<string[]>([])
const localSelectAll = ref(false)

function toggleAll() {
  localSelected.value = localSelectAll.value ? [] : porps.products.map((p) => p.id)
}

watchEffect(() => {
  localSelected.value = localSelected.value.filter((id) =>
    porps.products.map((p) => p.id).includes(id),
  )
  localSelectAll.value = porps.products.length === localSelected.value.length
  emits('selection', localSelected.value)
})
</script>
