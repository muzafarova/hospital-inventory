<template>
  <div>
    <BaseButton
      @click.stop="modalOpen = true"
      :variant="toggleVariant"
      :aria-controls="modalId"
      :label="toggleTitle"
    >
      <slot name="button" />
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
    modalId: string
    modalTitle: string
    toggleTitle: string
    toggleVariant?: 'accent' | 'default' | 'danger' | 'inline'
  }>(),
  {
    toggleVariant: 'default',
  },
)

const modalOpen = ref(false)
</script>
