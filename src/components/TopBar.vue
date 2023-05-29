<script setup lang="ts">
import { ref } from "vue";
import SiteLogo from "./SiteLogo.vue";
import TopBarNav from "./TopBarNav.vue";

const opened = ref(false);
</script>

<template>
  <div id="topbar--root">
    <div id="topbar--main" class="container-xxl p-2">
      <RouterLink to="/" id="topbar--logo-link">
        <SiteLogo />
      </RouterLink>
      <div class="hide show-md">
        <TopBarNav @link_clicked="opened = false" />
      </div>
      <button @click="opened = !opened" id="topbar--button" class="hide-md">
        <img src="@/assets/img/material_menu.svg" />
      </button>
    </div>
    <div v-if="opened" class="hide-md p-2">
      <TopBarNav @link_clicked="opened = false" />
    </div>
  </div>
</template>

<style scoped>
#topbar--root {
  background-color: #f1f1f1;
}

#topbar--main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#topbar--logo-link {
  text-decoration: none;
  color: initial;
}

#topbar--button {
  padding: 0;
  line-height: 0; /* fix for weird button padding with img */
  border: none;
  background: none;
}
</style>
