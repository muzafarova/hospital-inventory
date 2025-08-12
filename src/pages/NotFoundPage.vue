<template>
  <h1>Page not found</h1>
  <p>
    Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or
    you may have entered an incorrect URL.
  </p>

  <p>
    <router-link to="/"> Go to Inventory </router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
})
</script>
