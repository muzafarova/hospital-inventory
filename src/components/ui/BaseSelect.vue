<template>
  <div>
    <label class="mb-1 block text-sm font-medium" :for="id">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      v-bind="$attrs"
      class="form-select w-full"
      :id="id"
      :name="id"
      :required="required"
      v-model="model"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="option of options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const model = defineModel();

withDefaults(
  defineProps<{
    id: string;
    label: string;
    options: string[];
    required?: boolean;
    placeholder?: string;
  }>(),
  { placeholder: "- select -" },
);

defineOptions({
  inheritAttrs: false,
});
</script>
