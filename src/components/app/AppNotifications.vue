<script setup lang="ts">
import BaseToast from "@/components/ui/BaseToast.vue";
import { useNotification } from "@/composables/notification";
const { notifications, clearErrors } = useNotification();
</script>

<template>
  <footer class="fixed right-0 bottom-0 m-2 space-y-1">
    <BaseToast
      v-for="(notification, i) of notifications"
      :key="notification + i"
      :open="true"
      type="error"
      @close="clearErrors()"
    >
      {{ notification }}
    </BaseToast>
  </footer>
</template>
