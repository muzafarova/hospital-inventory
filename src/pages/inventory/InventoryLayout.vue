<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Content area -->
    <div class="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <!-- Site header -->
      <AppTopbar />

      <main class="grow">
        <div class="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
          <!-- Page header -->
          <div class="mb-5 sm:flex sm:items-center sm:justify-between">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h2 class="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
                {{ title }}
                <!-- Loading State -->
                <BaseSpinner v-if="loading" class="mx-2" />
              </h2>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid w-full grid-flow-col justify-start gap-2 sm:flex-1 sm:auto-cols-max sm:justify-end"
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
import AppTopbar from "@/components/app/AppTopbar.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

defineProps<{ loading: boolean; title: string }>();
</script>
