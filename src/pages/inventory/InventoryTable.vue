<template>
  <div class="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-gray-800 dark:text-gray-100">
        Products
        <span class="text-gray-400 dark:text-gray-500 font-medium inline-block ml-1">
          <slot name="pagination" />
        </span>
      </h2>
    </header>

    <!-- <div class="overflow-x-auto"> -->
    <table width="100%" class="table-auto w-full dark:text-gray-300">
      <thead
        class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/85 border-t border-b border-gray-100 dark:border-gray-700/85 sticky top-15 z-20"
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
        <tr
          v-for="product in products"
          :key="product.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-50/5"
        >
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
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
          </td>
          <td
            class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
            :class="{ 'text-right': ['price', 'quantity'].includes(column[0]) }"
            v-for="column of columns"
            :key="column[0]"
          >
            <span v-if="column[0] === 'price'">£{{ product[column[0]] }}</span>
            <span v-else-if="column[0] === 'expiresAt'">{{
              new Date(product[column[0]]).toLocaleDateString()
            }}</span>
            <span v-else>
              {{ product[column[0]] }}
            </span>
          </td>
          <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
            <div class="space-x-3">
              <button
                class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full"
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

              <button
                class="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-500 rounded-full"
                @click="$emit('remove', product.id)"
              >
                <span class="sr-only">Delete</span>
                <svg viewBox="0 0 16 16" fill="currentColor" class="size-5 p-[1.5px]">
                  <path
                    fill-rule="evenodd"
                    d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Product, ProductColumnKey } from '@/types'

const porps = defineProps<{
  total: number
  limit?: number
  offset?: number
  products: Product[]
  columns: [ProductColumnKey, string][]
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
