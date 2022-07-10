<template>
  <div id="all" class="mt-5">
    <img :src="mascotPath()" />
    <div id="not-found" class="m-2">Page not found :(</div>
    <router-link to="/">Home</router-link>
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

#not-found {
  font-weight: bold;
}
</style>
