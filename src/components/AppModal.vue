<template>
  <div>
    <!-- Modal backdrop -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-out duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="modalOpen"
        class="fixed inset-0 bg-black/30 z-50 transition-opacity"
        aria-hidden="true"
        data-testid="modal-backdrop"
      ></div>
    </transition>
    <!-- Modal dialog -->
    <transition
      enter-active-class="transition ease-in-out duration-200"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in-out duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-show="modalOpen"
        :id="id"
        class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <div
          ref="modalContent"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-auto max-w-lg w-full max-h-full"
        >
          <!-- Modal header -->
          <div class="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
            <div class="flex justify-between items-center">
              <div class="font-semibold text-gray-800 dark:text-gray-100">{{ title }}</div>
              <button
                class="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                @click.stop="$emit('close')"
              >
                <div class="sr-only">Close</div>
                <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16">
                  <path
                    d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener, onClickOutside } from '@vueuse/core'

/**
 * Props of the component
 * @typedef {Object} Props
 * @property {string} id - unique identifier of the modal
 * @property {string} title - title of the modal
 * @property {boolean} modalOpen - whether the modal is open
 */
const props = withDefaults(
  defineProps<{
    /** unique identifier of the modal */
    id: string
    /** title of the modal */
    title: string
    /** whether the modal is open */
    modalOpen?: boolean
  }>(),
  { modalOpen: false },
)
const emits = defineEmits<{ close: [] }>()

const modalContent = ref<HTMLElement | null>(null)

onClickOutside(modalContent, () => emits('close'))

useEventListener(document, 'keydown', ({ code }: KeyboardEvent) => {
  if (!props.modalOpen || code !== 'Escape') return
  emits('close')
})
</script>
