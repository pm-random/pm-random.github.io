<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');

html, body {
  margin: auto;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#page-content {
  margin: 8px;
  width: fit-content;
}

h1, h2, h3 {
  font-family: 'Rajdhani', sans-serif;
}

table {
  border-collapse: collapse;
  margin: auto;
}

thead tr {
  background-color: #77AA6D;
  color: white;
}

tbody tr {
  border-bottom: 1px solid #AAAAAA;
}

tbody tr:last-of-type {
  border-bottom: 2px solid #AAAAAA;
}

tbody tr:nth-child(odd) {
  background-color: white;
}

tbody tr:nth-child(even) {
  background-color: #EBEBEB;
}

th, td {
  border: 1px solid #AAAAAA;
  padding: 5px;
}

td img {
  vertical-align: middle;
  padding: 1px;
}
</style>
