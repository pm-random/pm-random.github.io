<template>
  <nav>
    <router-link :to="'/'">
      <img src="/favicon.ico">
      <NameAndVersion/>
    </router-link>
    <a id="github" href="https://github.com/pm-random">
      <img src="images/github.svg">    
    </a>
  </nav>
</template>


<script>
import NameAndVersion from '@/components/NameAndVersion';

export default {
  components: { NameAndVersion },
  data() {
    return {
      version: null
    }
  }
}
</script>


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


a {
  text-decoration: none;
}
</style>
