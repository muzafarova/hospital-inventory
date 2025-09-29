<template>
  <span class="sr-only">{{ name }}</span>
  <PencilIcon v-if="name === 'edit'" class="size-5" />
  <TrashIcon v-if="name === 'delete'" class="size-5 p-[1.5px]" />
</template>

<script setup lang="ts">
import PencilIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
defineProps<{
  name: "edit" | "delete";
}>();
</script>
