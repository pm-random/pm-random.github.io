<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');
@import '~bootstrap/dist/css/bootstrap.min.css';


#app {
  --accent-color: #be1a39;
  --chara-icon-size: 85px;

  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 15px;
}

.page-content {
  padding: 16px;
}

h1, h2, h3 {
  font-family: 'Rajdhani', sans-serif;
}

h1 {
  margin: 22px 0 22px 0 !important;
}

h2 {
  margin: 20px 0 20px 0 !important;
}

tr {
  vertical-align: middle;
}

tbody tr:nth-child(odd) {
  background-color: white;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
