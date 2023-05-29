<script setup lang="ts">
import { watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import store from "@/store";
import TopBar from "@/components/TopBar.vue";

useHead({ title: "PM Random" });

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
