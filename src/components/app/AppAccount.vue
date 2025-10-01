<template>
  <div class="flex">
    <h1 class="font-semibold">{{ hospitalStore.data?.name || "Hospital Inventory" }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useHospitalStore } from "@/stores/hospital";

const hospitalStore = useHospitalStore();
</script>
