<script setup lang="ts">
import BaseToast from "@/components/ui/BaseToast.vue";
import { useErrorStore } from "@/stores/error";
const errorStore = useErrorStore();
</script>

<template>
  <footer class="fixed right-0 bottom-0 m-2 space-y-1">
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
