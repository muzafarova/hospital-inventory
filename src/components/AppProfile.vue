<template>
  <AppDropdown label="Profile" class="flex">
    <template #button="{ dropdownOpen }">
      <span class="size-6 rounded-full bg-gray-500">
        <img :src="image" class="size-full rounded-full" />
      </span>
      <div class="flex items-center truncate">
        <span
          class="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white"
          >{{ username }}</span
        >
        <DropdownArrow :isOpen="dropdownOpen" class="size-3 ml-2" />
      </div>
    </template>

    <template #default="{ close }">
      <div class="py-2 px-4 border-b border-gray-200 dark:border-gray-700/60">
        <div class="font-medium text-gray-800 dark:text-gray-100 leading-6">{{ name }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400 italic leading-5">{{ email }}</div>
      </div>
      <ul>
        <li>
          <button
            class="font-medium text-sm text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 flex items-center py-2 px-4"
            to="/signin"
            @click="
              () => {
                close()
                $emit('logout')
              }
            "
          >
            Sign Out
          </button>
        </li>
      </ul>
    </template>
  </AppDropdown>
</template>

<script setup lang="ts">
import DropdownArrow from '@/components/icons/DropdownArrow.vue'
import AppDropdown from '@/components/AppDropdown.vue'

defineProps<{ username: string; name: string; image: string; email: string }>()
defineEmits<{ logout: [] }>()
</script>
