<script setup lang="ts">
import { cdn_url } from "@/cdn";
import { useTitle } from "@vueuse/core";;

useTitle("Page not found | PM Random");
</script>

<template>
  <div id="pagenotfound--root">
    <img :src="cdn_url('images/menu/mascot.png')" id="pagenotfound--mascot" />
    <div class="pagenotfound--bold">Page not found :(</div>
    <router-link class="pagenotfound--bold" to="/">Home</router-link>
  </div>
</template>

<style scoped>
#pagenotfound--root {
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125em;
}

#pagenotfound--mascot {
  max-height: 160px;
}

.pagenotfound--bold {
  font-weight: bold;
}
</style>
