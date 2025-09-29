<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div class="max-w-2xl m-auto mt-16">
            <div class="text-center px-4">
              <div class="inline-flex mb-8">
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
