<template>
  <nav class="navbar navbar-expand-md">
    <div class="container-xxl">
      <router-link :to="'/'" class="navbar-brand d-flex p-0">
        <img :src="iconPath()" />
        <NameAndVersion class="ms-1"/>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav me-auto flex-row flex-wrap bd-navbar-nav">
          <router-link :to="'/characters'" class="nav-link col-6 col-md-auto">Characters</router-link>
          <router-link :to="'/monsters'" class="nav-link col-6 col-md-auto">Pokémon</router-link>
          <router-link :to="'/revenue'" class="nav-link col-6 col-md-auto">Revenue</router-link>
          <router-link :to="'/voice-actors'" class="nav-link col-6 col-md-auto">Voice Actors</router-link>
          <router-link :to="'/character-ids'" class="nav-link col-6 col-md-auto">Character IDs</router-link>
        </div>

        <hr class="d-md-none text-gray" />

        <a href="https://github.com/pm-random">
          <img src="/src/assets/github.svg" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import NameAndVersion from "@/components/NameAndVersion.vue";

const specialIconDeadline = "2022-06-02";

function iconPath(): string {
  if (new Date() < new Date(specialIconDeadline))
    return "/src/assets/special-icon.png";
  return "/src/assets/characters.png";
}
</script>

<style scoped>
nav {
  background-color: #f1f1f1;
}

img {
  height: 36px;
}
</style>
