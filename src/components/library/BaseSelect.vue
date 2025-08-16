<template>
  <div>
    <label class="block text-sm font-medium mb-1" :for="id">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      v-bind="$attrs"
      class="form-select"
      :id="id"
      :modelValue="value"
      @change="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    >
      <option v-for="option of options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label: string
  options: string[]
  required?: boolean
  value?: string | number
}>()

defineEmits<{ 'update:modelValue': [value: string | number] }>()

defineOptions({
  inheritAttrs: false,
})
</script>
