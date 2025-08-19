<template>
  <form @submit.prevent="$emit('submit')">
    <div class="px-5 py-4">
      <div class="space-y-3">
        <BaseInput
          label="Product Name"
          id="name"
          required
          :model-value="modelValue.name"
          @update:model-value="(name) => $emit('update:modelValue', { ...modelValue, name })"
        />
        <BaseSelect
          v-if="hospitalStore.data"
          label="Manufacturer"
          id="manufacturer"
          required
          :options="hospitalStore.data.spec.manufacturers"
          :model-value="modelValue.manufacturer"
          @update:model-value="
            (manufacturer) => $emit('update:modelValue', { ...modelValue, manufacturer })
          "
        />
        <BaseSelect
          v-if="hospitalStore.data"
          label="Category"
          id="category"
          required
          :options="hospitalStore.data.spec.categories"
          :model-value="modelValue.category"
          @update:model-value="
            (category) => $emit('update:modelValue', { ...modelValue, category })
          "
        />
        <div class="grid md:grid-cols-2">
          <div class="grid md:grid-cols-2">
            <BaseInput
              label="Quantity"
              id="quantity"
              required
              type="number"
              min="0"
              :model-value="modelValue.quantity"
              @update:model-value="
                (quantity) => $emit('update:modelValue', { ...modelValue, quantity })
              "
            />
            <BaseInput
              v-if="fields.includes('price')"
              label="Price"
              id="price"
              min="0"
              required
              :model-value="modelValue.price"
              @update:model-value="(price) => $emit('update:modelValue', { ...modelValue, price })"
            />
          </div>
          <BaseInput
            v-if="fields.includes('expiresAt')"
            label="Expiry date"
            id="expiresAt"
            type="date"
            required
            :model-value="modelValue.expiresAt"
            @update:model-value="
              (expiresAt) =>
                !expiresAt
                  ? $emit('update:modelValue', { ...modelValue, expiresAt: null })
                  : $emit('update:modelValue', { ...modelValue, expiresAt })
            "
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col px-6 py-5 border-t border-gray-200 dark:border-gray-700/60">
      <div class="flex self-end">
        <BaseButton type="submit" variant="accent">{{ submitLabel }}</BaseButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useHospitalStore } from '@/stores/hospital'

import { type NewProductSpec } from '@/api/endpoints'

import BaseInput from '@/components/library/BaseInput.vue'
import BaseSelect from '@/components/library/BaseSelect.vue'
import BaseButton from '@/components/library/BaseButton.vue'

withDefaults(
  defineProps<{
    submitLabel: string
    modelValue: NewProductSpec
  }>(),
  { submitLabel: 'Submit' },
)

defineEmits<{
  submit: []
  'update:modelValue': [value: NewProductSpec]
}>()

const hospitalStore = useHospitalStore()
const fields = computed(() =>
  hospitalStore.data ? hospitalStore.data.spec.tableColumns.map((col) => col[0]) : [],
)
</script>
