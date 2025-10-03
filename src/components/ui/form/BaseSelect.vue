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
      <option :disabled="options.length === 0" value="">Select one...</option>
      <option v-for="option of options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const model = defineModel("modelValue", {
  get(value) {
    if (value === undefined) {
      return "";
    }
    return value;
  },
  set(value) {
    if (value === "") {
      return undefined;
    }
    return value;
  },
});

withDefaults(
  defineProps<{
    id: string;
    label: string;
    options?: string[];
    required?: boolean;
  }>(),
  { options: () => [] },
);

defineOptions({
  inheritAttrs: false,
});
</script>
