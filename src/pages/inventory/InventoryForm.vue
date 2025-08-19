<template>
  <form @submit.prevent>
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
              (expiresAt) => $emit('update:modelValue', { ...modelValue, expiresAt })
            "
          />
        </div>
      </div>
    </div>

    <BaseButton type="submit">Submit</BaseButton>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useHospitalStore } from '@/stores/hospital'

import Product from '@/entities/product'

import BaseInput from '@/components/library/BaseInput.vue'
import BaseSelect from '@/components/library/BaseSelect.vue'
import BaseButton from '@/components/library/BaseButton.vue'

defineProps<{
  modelValue: Omit<Product, 'hospitalId' | 'id'>
}>()

const hospitalStore = useHospitalStore()
const fields = computed(() =>
  hospitalStore.data ? hospitalStore.data.spec.tableColumns.map((col) => col[0]) : [],
)
</script>
