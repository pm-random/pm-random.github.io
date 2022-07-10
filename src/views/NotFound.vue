<template>
  <div id="all" class="mt-5">
    <img :src="mascotPath()" />
    <div class="bold m-2">Page not found :(</div>
    <router-link class="bold" to="/">Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { mascotPath } from "@/data";
import { useHead } from "@vueuse/head";

useHead({ title: "Page not found | PM Random" });
</script>

<style scoped>
#all {
  font-size: 1.2em;
}

.bold {
  font-weight: bold;
}
</style>
