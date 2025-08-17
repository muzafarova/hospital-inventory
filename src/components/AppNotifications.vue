<script setup lang="ts">
import BaseToast from '@/components/library/BaseToast.vue'
import { useErrorStore } from '@/stores/error'
const errorStore = useErrorStore()
</script>

<template>
  <footer class="fixed bottom-0 right-0 m-2">
    <BaseToast
      v-for="(notification, i) of errorStore.notifications"
      :key="notification + i"
      :open="true"
      type="error"
      @close="errorStore.clear()"
    >
      {{ notification }}
    </BaseToast>
  </footer>
</template>
