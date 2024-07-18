<script setup lang="ts">
const props = defineProps<{ content: any }>();
</script>

<template>
  <div class="badge-- px-2 py-1">{{ content }}</div>
</template>

<style scoped>
.badge-- {
  border-radius: var(--border-radius);
  background-color: #0d6efd;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}
</style>