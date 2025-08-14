<script setup lang="ts">
import Toast from '@/components/library/Toast.vue'
import { useINotificationStore } from '@/stores/notification'

const notificationStore = useINotificationStore()
</script>

<template>
  <footer class="fixed bottom-0 right-0 m-2">
    <Toast
      v-for="notification of notificationStore.notifications"
      :key="notification[0] + notification[1]"
      :open="true"
      :type="notification[1]"
      @close="notificationStore.clear()"
    >
      {{ notification[0] }}
    </Toast>
  </footer>
</template>
