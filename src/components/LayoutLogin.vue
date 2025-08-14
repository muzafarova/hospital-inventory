<template>
  <main class="bg-white dark:bg-gray-900">
    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
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

          <div class="max-w-sm mx-auto w-full px-4 py-8">
            <h1 class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-8">
              Hospital Inventory
            </h1>

            <!-- Form -->
            <form @submit.prevent="$emit('submit')">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="username">Username</label>
                  <input
                    :value="username"
                    id="username"
                    class="form-input w-full"
                    type="text"
                    required
                    @change="(e) => $emit('update:username', (e.target as HTMLInputElement).value)"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password</label>
                  <div class="relative">
                    <input
                      :value="password"
                      id="password"
                      class="form-input w-full pr-9"
                      :type="showPassword ? 'text' : 'password'"
                      autoComplete="on"
                      required
                      @change="
                        (e) => $emit('update:password', (e.target as HTMLInputElement).value)
                      "
                    />
                    <div class="absolute z-10 inset-0 left-auto flex items-center">
                      <button type="button" @click="showPassword = !showPassword" class="h-full">
                        <!-- TODO remember user pref -->
                        <svg
                          v-show="showPassword"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3 ml-2"
                        >
                          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                          <path
                            fill-rule="evenodd"
                            d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          v-show="!showPassword"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3 ml-2"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                            clip-rule="evenodd"
                          />
                          <path
                            d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-6">
                <div class="mr-1">
                  <router-link class="text-sm underline hover:no-underline" to="/reset-password"
                    >Forgot Password?</router-link
                  >
                </div>
                <button
                  type="submit"
                  class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap ml-3"
                  to="/"
                >
                  Sign In
                </button>
              </div>
            </form>
            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-gray-200 dark:border-gray-700">
              <!-- Hint -->
              <div v-if="hint" class="mt-5">
                <div
                  class="bg-blue-500/20 dark:text-blue-200 dark:bg-blue-500/30 text-blue-700 px-3 py-2 rounded-lg"
                >
                  <svg class="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                    <path
                      d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                    />
                  </svg>
                  <span class="text-sm font-mono">{{ hint }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img
          class="object-cover object-center w-full h-full hidden dark:block"
          src="/images/auth-image-dark.jpg"
          width="760"
          height="1024"
          alt=""
        />
        <img
          class="object-cover object-center w-full h-full block dark:hidden"
          src="/images/auth-image-light.jpg"
          width="760"
          height="1024"
          alt=""
        />
      </div>
    </div>
  </main>
  <slot />
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  username: string
  password: string
  hint?: string
  error?: string
}>()

defineEmits<{
  'update:username': [value: string]
  'update:password': [value: string]
  close: []
  submit: []
}>()

const showPassword = ref(false)
</script>
