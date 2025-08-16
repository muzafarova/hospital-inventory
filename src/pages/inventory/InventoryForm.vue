<template>
  <form @submit.prevent>
    <div class="px-5 py-4">
      <div class="space-y-3">
        <BaseInput label="Product Name" id="name" required />
        <div class="grid md:grid-cols-2">
          <BaseSelect label="Manufacturer" id="manufacturer" required :options="manufacturers" />
          <BaseSelect label="Category" id="categories" required :options="manufacturers" />
        </div>
        <div class="grid md:grid-cols-2">
          <div class="grid md:grid-cols-2">
            <BaseInput label="Quantitye" id="quantity" required type="number" min="0" />
            <BaseInput label="Price" id="price" required min="0" />
          </div>
          <BaseInput label="Expiry date" id="expiresAt" required type="date" />
        </div>
      </div>
    </div>

    <BaseButton type="submit">Submit</BaseButton>
  </form>
</template>

<script setup lang="ts">
import BaseInput from '@/components/library/BaseInput.vue'
import BaseSelect from '@/components/library/BaseSelect.vue'
import BaseButton from '@/components/library/BaseButton.vue'

defineProps<{
  manufacturers: string[]
  categories: string[]
}>()
</script>
