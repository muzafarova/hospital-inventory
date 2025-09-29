<template>
  <span class="inline-flex items-center gap-4 text-gray-600 dark:text-gray-400">
    <span v-if="!loading" class="inline-flex gap-1.5 font-medium">
      <span class="font-mono">{{ range }}</span>
      <span v-if="total" class="inline-flex gap-2">
        <span class="font-normal italic">of</span>
        <span class="font-mono">{{ total }}</span>
      </span>
    </span>

    <span class="pagination inline-flex items-center gap-4">
      <BaseButton :disabled="page === 1" variant="inline" title="First page" @click="first()">
        <DoubleArrowLeftIcon class="size-4" />
      </BaseButton>
      <BaseButton :disabled="page === 1" variant="inline" title="Previous page" @click="prev()">
        <ArrowLeftIcon class="size-4" />
      </BaseButton>
      <BaseButton :disabled="page === lastPage" variant="inline" title="Next page" @click="next()">
        <ArrowRightIcon class="size-4" />
      </BaseButton>
      <BaseButton
        v-if="total"
        :disabled="page === lastPage"
        variant="inline"
        title="Last page"
        @click="last()"
      >
        <DoubleArrowRightIcon class="size-4" />
      </BaseButton>
    </span>
  </span>
</template>

<style>
.pagination {
  svg {
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  button {
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'

import BaseButton from './BaseButton.vue'
import DoubleArrowLeftIcon from '@/components/icons/DoubleArrowLeftIcon.vue'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import DoubleArrowRightIcon from '@/components/icons/DoubleArrowRightIcon.vue'

const props = withDefaults(
  defineProps<{
    offset?: number
    count?: number
    limit?: number
    total?: number
    loading?: boolean
  }>(),
  {
    offset: 0,
    count: 0,
    limit: 100,
  },
)

const emit = defineEmits<{
  'update:offset': [offset: number | undefined]
}>()

const page = computed(() => {
  return Math.floor(props.offset / props.limit) + 1
})

const tail = computed(() => {
  if (props.total) {
    const min = Math.floor((page.value - 1) * props.limit)
    const max = Math.floor(page.value * props.limit)
    if (max >= props.total) {
      return props.total - min
    }
    return max - min
  }
  return props.count
})

const range = computed(() => {
  if (!props.count) {
    return '…'
  }

  return `${props.offset + 1}-${props.offset + tail.value}`
})

const first = () => {
  update(undefined)
}

const prev = () => {
  if (props.offset <= 0) {
    return
  }
  update(props.offset - props.limit)
}

const next = () => {
  update(props.offset + props.limit)
}

const lastPage = computed(() => {
  if (!props.total) {
    return 0
  }
  return Math.ceil(props.total / props.limit)
})

const last = () => {
  if (!props.total) {
    return
  }
  update((lastPage.value - 1) * props.limit)
}

const update = (offset: number | undefined) => {
  emit('update:offset', offset)
}
</script>
