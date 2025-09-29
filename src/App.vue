<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "@/composables/theme";

import AppNotifications from "./components/AppNotifications.vue";

const { applyTheme } = useTheme();
onMounted(() => applyTheme());
</script>

<template>
  <router-view />
  <AppNotifications />
</template>

<style></style>
