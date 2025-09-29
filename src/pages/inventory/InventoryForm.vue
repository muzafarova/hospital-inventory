<template>
  <form @submit.prevent="$emit('submit')">
    <div class="p-5">
      <div class="space-y-5">
        <BaseInput
          label="Product Name"
          id="name"
          required
          :model-value="modelValue.name"
          @update:model-value="(name) => $emit('update:modelValue', { ...modelValue, name })"
        />
        <BaseSelect
          label="Manufacturer"
          id="manufacturer"
          required
          :options="manufacturers"
          :model-value="modelValue.manufacturer"
          @update:model-value="
            (manufacturer) => $emit('update:modelValue', { ...modelValue, manufacturer })
          "
        />
        <BaseSelect
          label="Category"
          id="category"
          required
          :options="categories"
          :model-value="modelValue.category"
          @update:model-value="
            (category) => $emit('update:modelValue', { ...modelValue, category })
          "
        />
        <div class="grid gap-2 md:grid-cols-3">
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

    <div class="flex flex-col border-t border-gray-200 px-6 py-5 dark:border-gray-700/60">
      <div class="flex self-end">
        <BaseButton type="submit" variant="accent">{{ submitLabel }}</BaseButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { type NewProductSpec } from "@/api/endpoints";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

withDefaults(
  defineProps<{
    fields: string[];
    manufacturers: string[];
    categories: string[];
    submitLabel: string;
    modelValue: NewProductSpec;
  }>(),
  { submitLabel: "Submit" },
);

defineEmits<{
  submit: [];
  "update:modelValue": [value: NewProductSpec];
}>();
</script>
