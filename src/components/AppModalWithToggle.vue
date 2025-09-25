<template>
  <div class="flex">
    <BaseButton @click.stop="modalOpen = true" :variant="toggleVariant">
      <slot name="button">{{ toggleTitle }}</slot>
    </BaseButton>

    <AppModal :id="modalId" :modal-open="modalOpen" :title="modalTitle" @close="modalOpen = false">
      <div class="p-5">
        <slot :close="() => (modalOpen = false)" />
      </div>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppModal from '@/components/AppModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

withDefaults(
  defineProps<{
    /** unique identifier of the modal */
    modalId: string
    /** title of the modal */
    modalTitle: string
    /** label of the button */
    toggleTitle: string
    /** variant of the button */
    toggleVariant?: 'accent' | 'default' | 'danger' | 'inline'
  }>(),
  {
    toggleVariant: 'default',
  },
)

const modalOpen = ref(false)
</script>
