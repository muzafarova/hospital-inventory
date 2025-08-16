<script setup lang="ts">
import BaseToast from '@/components/library/BaseToast.vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
</script>

<template>
  <footer class="fixed bottom-0 right-0 m-2">
    <BaseToast
      v-for="notification of notificationStore.notifications"
      :key="notification[0] + notification[1]"
      :open="true"
      :type="notification[1]"
      @close="notificationStore.clear()"
    >
      {{ notification[0] }}
    </BaseToast>
  </footer>
</template>
