<template>
  <table width="100%" class="text-left">
    <thead>
      <tr>
        <th v-for="column of columns" :key="column[0]">{{ column[1] }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td v-for="column of columns" :key="column[0]">
          {{ product[column[0]] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Product, ProductColumnKey } from '@/types'

defineProps<{
  total: number
  limit?: number
  offset?: number
  products: Product[]
  columns: [ProductColumnKey, string][]
}>()
</script>
