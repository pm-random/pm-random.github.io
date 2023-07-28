<script setup lang="ts">
import { watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useFavicon } from "@vueuse/core";
import { cdn_url } from "./cdn";
import store from "@/store";
import TopBar from "@/components/TopBar.vue";

useFavicon(cdn_url("images/site-logo.png"));

const route = useRoute();
watch(route, () => {
  store.update_version();
  // Eventual analytics event here
});
</script>

<template>
  <div>
    <TopBar />
    <div class="container-xxl p-3">
      <RouterView />
    </div>
  </div>
</template>
