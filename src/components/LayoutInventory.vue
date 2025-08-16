<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <AppTopbar />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Inventory
                <slot name="title" />
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div
              class="sm:flex-1 w-full grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <slot name="actions" />
            </div>
          </div>

          <!-- Main content-->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppTopbar from '@/components/AppTopbar.vue'
</script>
