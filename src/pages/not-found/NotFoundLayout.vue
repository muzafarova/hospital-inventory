<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <div class="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <main class="grow">
        <div class="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
          <div class="m-auto mt-16 max-w-2xl">
            <div class="px-4 text-center">
              <div class="mb-8 inline-flex">
                <img
                  class="block dark:hidden"
                  src="/images/404-illustration.svg"
                  width="176"
                  height="176"
                  alt=""
                />
                <img
                  class="hidden dark:block"
                  src="/images/404-illustration-dark.svg"
                  width="176"
                  height="176"
                  alt=""
                />
              </div>
              <slot />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
