<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <AppHeader>
        <AppTopbar />
      </AppHeader>

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Inventory
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <!-- Delete button -->
              <DeleteButton :selectedItems="selectedItems" />

              <!-- Add item button -->
              <button
                class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              >
                <svg
                  class="fill-current shrink-0 sm:hidden"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                  />
                </svg>
                <span class="max-sm:sr-only">Add item</span>
              </button>

              <!-- Divider -->
              <hr class="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none self-center mx-1" />

              <!-- Search form -->
              <SearchForm placeholder="Search by item name" />

              <!-- Filter button -->
              <FilterButton align="right" />
            </div>
          </div>

          <slot />

          <!-- Table -->
          <!-- <InvoicesTable @change-selection="updateSelectedItems($event)" /> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppTopbar.vue'
// import InvoicesTable from '@/partials/invoices/InvoicesTable.vue'
import DeleteButton from '@/pages/inventory/BulkDeleteButton.vue'

import SearchForm from '@/components/library/SearchForm.vue'
import FilterButton from '@/pages/inventory/InventoryConfig.vue'

import AppTopbar from '@/components/AppTopbar.vue'

const selectedItems = ref([])

// const updateSelectedItems = (selected) => {
//   selectedItems.value = selected
// }
</script>
