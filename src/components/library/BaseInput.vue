<template>
  <div>
    <label class="block text-sm font-medium mb-1" :for="id">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      v-bind="$attrs"
      :id="id"
      class="form-input w-full"
      :type="type"
      :required="required"
      :modelValue="value"
      @change="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    label: string
    required?: boolean
    type?: string
    value?: string | number
  }>(),
  { type: 'text' },
)

defineEmits<{ 'update:modelValue': [value: string | number] }>()

defineOptions({
  inheritAttrs: false,
})
</script>
