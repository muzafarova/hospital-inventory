<template>
  <BaseInput
    v-model="password"
    label="Password"
    id="password"
    required
    :type="showPassword ? 'text' : 'password'"
    class="relative pr-9"
  >
    <div class="absolute inset-0 left-auto z-10 flex items-center">
      <button type="button" class="h-full" @click="showPassword = !showPassword">
        <EyeOpenIcon v-if="showPassword" />
        <EyeClosedIcon v-else />
      </button>
    </div>
  </BaseInput>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EyeOpenIcon from "@/components/icons/EyeOpenIcon.vue";
import EyeClosedIcon from "@/components/icons/EyeClosedIcon.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

const showPassword = ref(false);

const password = defineModel<string>();
</script>
