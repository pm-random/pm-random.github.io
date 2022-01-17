<template>
  <nav class="navbar navbar-light">
    <div class="container-fluid">
      <router-link :to="'/'" id="branding">
        <img src="/favicon.ico">
        <NameAndVersion/>
      </router-link>
      <a href="https://github.com/pm-random">
        <button class="btn btn-outline-primary" href="https://github.com/pm-random">View on Github</button>
      </a>
    </div>
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
#branding {
  display: inline-flex;
  gap: 6px;
}

nav {
  background-color: #f1f1f1;
  padding: 8px;
  box-shadow: 0px 1px 3px #BBBBBB;
}

img {
  height: 40px;
}

a {
  text-decoration: none;
}
</style>
