<template>
  <tr class="hover:bg-gray-50 dark:hover:bg-gray-50/5">
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <slot name="select" />
    </td>
    <td
      class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
      :class="{ 'text-right': ['price', 'quantity'].includes(column[0]) }"
      v-for="column of columns"
      :key="column[0]"
    >
      <span :class="{ 'animate-pulse': updating }">
        <span v-if="column[0] === 'code'" class="font-mono">
          {{ product['code'] }}
        </span>
        <span v-else-if="column[0] === 'price'">£{{ product['price'] }}</span>
        <span v-else-if="column[0] === 'expiresAt'">{{ product['expiresAt'] }}</span>
        <span v-else>
          {{ product[column[0]] }}
        </span>
      </span>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="space-x-3">
        <ProductEdit :product="product" @update="updating = true" />

        <BaseButton
          label="Delete"
          variant="table"
          class="hover:text-red-500 dark:hover:text-red-500"
          @click="
            () => {
              updating = true
              $emit('remove', product.id)
            }
          "
        >
          <BaseIcon name="delete" />
        </BaseButton>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Product from '@/entities/product'
import ProductEdit from './ProductEdit.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

defineEmits<{ remove: [value: string] }>()

const porps = defineProps<{
  product: Product
  columns: [keyof Product, string][]
}>()

const updating = ref(false)

watchEffect(() => {
  if (porps.product.updatedAt) {
    updating.value = false
  }
})
</script>
