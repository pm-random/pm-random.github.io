<script setup lang="ts">
import { cdn_url } from "@/cdn";
import SiteLogoText from "./SiteLogoText.vue";
</script>

<template>
  <div id="sitelogo--root">
    <img :src="cdn_url('images/logo.png')" id="sitelogo--img" />
    <SiteLogoText />
  </div>
</template>

<style scoped>
#sitelogo--root {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

#sitelogo--img {
  max-height: 2.25rem;
}
</style>
