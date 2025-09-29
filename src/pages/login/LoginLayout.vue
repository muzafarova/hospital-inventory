<template>
  <main class="bg-white dark:bg-gray-900">
    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="flex h-full min-h-[100dvh] flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="block" to="/">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                      <stop stop-color="#B7ACFF" stop-opacity="0" offset="0%" />
                      <stop stop-color="#B7ACFF" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                      <stop stop-color="#7BC8FF" stop-opacity="0" offset="0%" />
                      <stop stop-color="#7BC8FF" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#8470FF" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#755FF8"
                  />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)"
                  />
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <div class="mx-auto w-full max-w-sm px-4 py-8">
            <h1 class="mb-8 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {{ title }}
            </h1>

            <!-- Form -->
            <slot />

            <!-- Footer -->
            <div class="mt-6 border-t border-gray-200 pt-5 dark:border-gray-700">
              <!-- Hint -->
              <div v-if="hint" class="mt-5">
                <div
                  class="rounded-lg bg-blue-500/20 px-3 py-2 text-blue-700 dark:bg-blue-500/30 dark:text-blue-200"
                >
                  <svg class="mr-2 inline size-3 shrink-0 fill-current" viewBox="0 0 12 12">
                    <path
                      d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                    />
                  </svg>
                  <span class="font-mono text-sm">{{ hint }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div class="absolute top-0 right-0 bottom-0 hidden md:block md:w-1/2" aria-hidden="true">
        <img
          class="hidden h-full w-full object-cover object-center dark:block"
          src="/images/auth-image-dark.jpg"
          width="760"
          height="1024"
          alt=""
        />
        <img
          class="block h-full w-full object-cover object-center dark:hidden"
          src="/images/auth-image-light.jpg"
          width="760"
          height="1024"
          alt=""
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
defineProps<{
  hint?: string;
  title?: string;
}>();
</script>
