<template>
  <div class="flex">
    <BaseButton @click.stop="modalOpen = true" :variant="toggleVariant" :size="toggleSize">
      <slot name="button">{{ toggleTitle }}</slot>
    </BaseButton>

    <BaseModal :id="modalId" :modal-open="modalOpen" :title="modalTitle" @close="modalOpen = false">
      <div class="p-5">
        <slot :close="() => (modalOpen = false)" />
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseModal from "@/components/ui/BaseModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

withDefaults(
  defineProps<{
    /** unique identifier of the modal */
    modalId: string;
    /** title of the modal */
    modalTitle: string;
    /** label of the button */
    toggleTitle: string;
    /** variant of the button */
    toggleVariant?: "accent" | "default" | "danger" | "inline";
    /** size of the button */
    toggleSize?: "xs" | "small" | "base" | "large";
  }>(),
  {
    toggleVariant: "default",
    toggleSize: "base",
  },
);

const modalOpen = ref(false);
</script>
