<template>
  <tr class="hover:bg-gray-50 dark:hover:bg-gray-50/5">
    <td class="w-px px-2 py-3 whitespace-nowrap first:pl-5 last:pr-5">
      <slot name="select" />
    </td>
    <td
      class="px-2 py-3 whitespace-nowrap first:pl-5 last:pr-5"
      :class="{ 'text-right': ['price', 'quantity'].includes(column[0]) }"
      v-for="column of columns"
      :key="column[0]"
    >
      <span :class="{ 'animate-pulse': updating }">
        <span v-if="column[0] === 'code'" class="font-mono">
          {{ product["code"] }}
        </span>
        <span v-else-if="column[0] === 'price'">£{{ product["price"] }}</span>
        <span v-else>
          {{ product[column[0]] }}
        </span>
      </span>
    </td>
    <td class="w-px px-2 py-3 whitespace-nowrap first:pl-5 last:pr-5">
      <div
        class="flex items-center justify-end space-x-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
      >
        <ProductEdit :product="product" @update="updating = true" />
        <ProductRemove :product-id="product.id" @update="updating = true" />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Product from "@/entities/product";
import ProductEdit from "./ProductEdit.vue";
import ProductRemove from "./ProductRemove.vue";

const props = defineProps<{
  product: Product;
  columns: [keyof Product, string][];
}>();

const updating = ref(false);

watchEffect(() => {
  if (props.product.updatedAt) {
    updating.value = false;
  }
});
</script>
