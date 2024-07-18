<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  opened: {
    type: Boolean,
    default: true
  }
});

const opened = ref(props.opened);
</script>

<template>
  <div id="accordion--header" class="py-3" @click="opened = !opened">
    <slot name="header"></slot>
    <div>
      <img v-if="opened" src="@/assets/img/material_expand_less.svg" />
      <img v-else src="@/assets/img/material_expand_more.svg" />
    </div>
  </div>
  <slot name="content" v-if="opened"></slot>
  <hr v-if="!opened">
</template>

<style scoped>
#accordion--header {
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
