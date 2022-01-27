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
  text-align: center;
  font-size: 15px;
}

.page-content {
  padding: 12px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Rajdhani', sans-serif;
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
