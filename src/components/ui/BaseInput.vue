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
      v-model="model"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel()

withDefaults(
  defineProps<{
    id: string
    label: string
    required?: boolean
    type?: string
  }>(),
  { type: 'text' },
)

defineOptions({
  inheritAttrs: false,
})
</script>
