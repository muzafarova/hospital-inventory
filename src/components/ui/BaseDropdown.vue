<template>
  <div class="relative">
    <button
      aria-haspopup="true"
      :aria-expanded="dropdownOpen"
      :aria-label="label"
      class="inline-flex"
      @click.prevent="dropdownOpen = !dropdownOpen"
    >
      <slot name="button" :dropdownOpen>
        <span
          class="flex items-center space-x-2 rounded-lg p-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <span>{{ label }}</span>
          <DropdownArrow
            :isOpen="dropdownOpen"
            :toggle="() => (dropdownOpen = !dropdownOpen)"
            class="ml-2 size-3"
          />
        </span>
      </slot>
    </button>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        ref="dropdown"
        v-show="dropdownOpen"
        class="absolute top-full z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        :class="align === 'right' ? 'right-0' : 'left-0'"
        @focusin="dropdownOpen = true"
        @focusout="dropdownOpen = false"
        role="menu"
      >
        <slot :close="() => (dropdownOpen = false)" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside, useEventListener } from "@vueuse/core";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";

withDefaults(
  defineProps<{
    /** label of the dropdown */
    label: string;
    /** alignment of the dropdown */
    align?: "right" | "left";
  }>(),
  {
    align: "right",
    label: "Toggle",
  },
);

const dropdownOpen = ref(false);
const dropdown = ref<HTMLElement | null>(null);

onClickOutside(dropdown, () => (dropdownOpen.value = false));

useEventListener(document, "keydown", ({ code }: KeyboardEvent) => {
  if (!dropdownOpen.value || code !== "Escape") return;
  dropdownOpen.value = false;
});
</script>
