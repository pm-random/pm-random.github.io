<template>
  <div>
    <h1>404</h1>
    <img src="/favicon.ico">
    <div id="message" class="padded-div">
      <div class="padded-div">Page not found :(</div>
      <router-link to="/">Homepage</router-link>
    </div>
  </div>
</template>


<script setup>
import { useHead } from '@vueuse/head';

useHead({ title: "Page not found | PM Random" });
</script>


<style scoped>
#message {
  font-weight: bold;
}

.padded-div {
  padding: 8px;
}

h1 {
  font-size: 4em;
  margin-bottom: 0px;
}
</style>
