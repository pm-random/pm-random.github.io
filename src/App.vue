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

.responsive-x {
  overflow-x: auto;
}

h1, h2, h3 {
  font-family: 'Rajdhani', sans-serif;
}

table {
  border-collapse: collapse;
  margin: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-bottom: 3px solid #aaf;
  border-radius: 18px 18px 0px 0px;
  overflow: hidden;
}

th {
  padding: 10px;
  background-color: #ccf;
  color: black;
}

tbody tr:nth-child(odd) {
  background-color: white;
}

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}

tr td {
  padding: 5px;
  border: 1px lightgray solid;
}

td img {
  vertical-align: middle;
  padding: 1px;
}
</style>
