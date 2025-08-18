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
                <!-- Loading State -->
                <span v-if="loading" class="inline-block mx-2">
                  <svg
                    class="animate-spin fill-current shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                    ></path>
                  </svg>
                </span>
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

defineProps<{ loading: boolean }>()
</script>
