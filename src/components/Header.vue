<template>
  <nav class="navbar navbar-light bg-light">
    <router-link :to="'/'">
      <img src="/logo.png">
      <span>PM Random</span>
    </router-link>
  </nav>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');

nav {
  background-color: #f1f1f1;
  text-align: left;
  padding: 8px;
}

img {
  height: 40px;
  vertical-align: middle;
}

span {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2em;
  vertical-align: middle;
  padding: 6px;
}

a {
  text-decoration: none;
  color: initial;
}
</style>
