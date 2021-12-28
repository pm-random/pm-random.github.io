<template>
  <div>
    <h1>404</h1>
    <img src="/favicon.ico">
    <p><strong>Page not found :(</strong></p>
    <p>The requested page could not be found.</p>
    <router-link to="/">Homepage</router-link>
  </div>
</template>


<script>
import { useHead } from '@vueuse/head';

export default {
  setup() {
    useHead({ title: "Page not found | PM Random" })
  },
}
</script>


<style>
h1 {
  font-size: 4em;
}
</style>
