<template>
  <div class="flex gap-1.5">
    <div class="flex items-center">
      <div class="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
        <span>{{ selected.length }}</span> items selected
      </div>
      <BaseButton @click="$emit('delete', selected)" variant="danger">{{
        loading ? 'Deleting...' : 'Delete'
      }}</BaseButton>
    </div>
    <!-- Divider -->
    <hr class="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none self-center" />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps<{ selected: string[]; loading: boolean }>()
defineEmits<{ delete: [value: string[]] }>()
</script>
