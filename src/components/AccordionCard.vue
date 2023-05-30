<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});

const opened = ref(props.open);
</script>

<template>
  <div class="card p-3">
    <div @click="opened = !opened" id="accordionitem--header">
      <slot name="header"></slot>
      <img v-if="opened" src="@/assets/img/material_remove.svg" />
      <img v-else src="@/assets/img/material_add.svg" />
    </div>
    <div v-if="opened" class="mt-2">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
#accordionitem--header {
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
