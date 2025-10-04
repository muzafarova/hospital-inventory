<template>
  <slot
    :manufacturers="hospitalStore.data?.spec?.manufacturers || []"
    :categories="hospitalStore.data?.spec?.categories || []"
  />
</template>

<script setup lang="ts">
import { useHospitalStore } from "@/stores/hospital";

const hospitalStore = useHospitalStore();
</script>
