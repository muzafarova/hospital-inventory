<template>
  <div>
    <label class="mb-1 block text-sm font-medium" :for="id">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      v-bind="$attrs"
      :id="id"
      :name="id"
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
    label: string;
    /**
     * Input type as in HTML
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types
     **/
    type?: "text" | "email" | "number" | "password" | "url" | "date";
    /** Prefilled value */
    required?: boolean;
  }>(),
  { type: "text", required: false },
);

const [model, modifiers] = defineModel("modelValue", {
  // https://vuejs.org/guide/components/v-model#handling-v-model-modifiers
  set(value) {
    if (modifiers.number) {
      return Number(value);
    }
    return value;
  },
});

defineOptions({
  inheritAttrs: false,
});
</script>
