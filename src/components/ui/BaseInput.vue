<template>
  <div>
    <label v-if="label" class="mb-1 block text-sm font-medium" :for="id">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      v-bind="$attrs"
      :id="id"
      class="form-input w-full"
      :type="type"
      :required="required"
      v-model="model"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    label?: string;
    required?: boolean;
    type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url" | "date";
    modelValue?: string | number;
  }>(),
  { type: "text" },
);

const model = defineModel();

defineOptions({
  inheritAttrs: false,
});
</script>
