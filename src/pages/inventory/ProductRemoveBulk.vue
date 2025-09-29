<template>
  <div class="flex gap-1.5">
    <div class="flex items-center">
      <div class="mr-2 hidden text-sm whitespace-nowrap italic xl:block">
        <span>{{ selected.length }}</span> items selected
      </div>
      <BaseButton @click="$emit('delete', selected)" variant="danger">{{
        loading ? "Deleting..." : "Delete"
      }}</BaseButton>
    </div>
    <!-- Divider -->
    <hr class="h-6 w-px self-center border-none bg-gray-200 dark:bg-gray-700/60" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps<{ selected: string[]; loading: boolean }>();
defineEmits<{ delete: [value: string[]] }>();
</script>
