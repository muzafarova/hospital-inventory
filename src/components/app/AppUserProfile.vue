<template>
  <BaseDropdown label="Profile" class="flex">
    <template #button="{ dropdownOpen }">
      <div
        class="inline-flex items-center justify-center hover:text-gray-900 dark:hover:text-white"
      >
        <span class="size-6 rounded-full bg-gray-500">
          <img :src="image" class="size-6 rounded-full" />
        </span>
        <div class="flex items-center truncate">
          <span class="ml-2 truncate text-sm font-medium">{{ username }}</span>
          <DropdownArrow :isOpen="dropdownOpen" class="ml-2 size-3" />
        </div>
      </div>
    </template>

    <template #default="{ close }">
      <div class="border-b border-gray-200 px-4 py-2 dark:border-gray-700/60">
        <div class="leading-6 font-medium text-gray-800 dark:text-gray-100">{{ name }}</div>
        <div class="text-xs leading-5 text-gray-500 italic dark:text-gray-400">{{ email }}</div>
      </div>
      <ul>
        <li>
          <button
            class="flex items-center px-4 py-2 text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
            to="/signin"
            @click="
              () => {
                close();
                $emit('logout');
              }
            "
          >
            Sign Out
          </button>
        </li>
      </ul>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import BaseDropdown from "@/components/ui/BaseDropdown.vue";

defineProps<{ username: string; name: string; image: string; email: string }>();
defineEmits<{ logout: [] }>();
</script>
