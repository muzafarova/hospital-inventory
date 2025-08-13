<template>
  <div>
    <button
      class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ml-3"
      :class="{ 'bg-gray-200 dark:bg-gray-800': searchModalOpen }"
      @click.stop="searchModalOpen = true"
      aria-controls="search-modal"
    >
      <span class="sr-only">Search</span>
      <svg
        class="fill-current text-gray-500/80 dark:text-gray-400/80"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z"
        />
        <path
          d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z"
        />
      </svg>
    </button>
    <SearchModal
      id="search-modal"
      searchId="search"
      :modalOpen="searchModalOpen"
      @open-modal="searchModalOpen = true"
      @close-modal="searchModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SearchModal from './ModalSearch.vue'

const searchModalOpen = ref(false)
</script>
