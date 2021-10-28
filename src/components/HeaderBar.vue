<template>
  <nav>
    <router-link :to="'/'">
      <img src="/favicon.ico">
      <span>PM Random<sup>{{ version }}</sup></span>
    </router-link>
    <a id="github" href="https://github.com/pm-random">
      <img src="images/github.svg">    
    </a>
  </nav>
</template>


<style scoped>
nav {
  background-color: #f1f1f1;
  text-align: left;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 3px #BBBBBB;
}

img {
  height: 40px;
  vertical-align: middle;
}

span {
  font-family: 'Rajdhani', sans-serif;
  font-size: 30px;
  color: black;
  vertical-align: middle;
  padding: 6px;
}

sup {
  font-size: 20px;
  color: blue;
}

a {
  text-decoration: none;
}
</style>


<script>
import { GAME_VERSION } from "@/data.js";

export default {
  data() {
    return {
      version: GAME_VERSION
    }
  }
}
</script>