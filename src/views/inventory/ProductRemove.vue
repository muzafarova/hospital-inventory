<template>
  <slot :updating="inventoryStore.removing">
    <BaseButton
      label="Delete"
      variant="inline"
      size="xs"
      class="hover:text-red-500 dark:hover:text-red-500"
      @click="
        async () => {
          await inventoryStore.removeProduct(productId);
          $emit('update');
        }
      "
    >
      <BaseIcon name="delete" />
    </BaseButton>
  </slot>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";
import { useInventoryStore } from "@/stores/inventory";

const inventoryStore = useInventoryStore();

defineProps<{ productId: string }>();
defineEmits<{ update: [] }>();
</script>
