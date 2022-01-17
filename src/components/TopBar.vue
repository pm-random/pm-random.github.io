<template>
  <nav class="navbar navbar-light navbar-expand-lg">
    <div class="container-fluid">
      <router-link :to="'/'" class="navbar-brand">
        <img src="/favicon.ico">
        <NameAndVersion/>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav me-auto flex-row flex-wrap bd-navbar-nav">
          <router-link :to="'/characters'" class="nav-link col-6 col-lg-auto">Characters</router-link>
          <router-link :to="'/monsters'" class="nav-link col-6 col-lg-auto">Pokémon</router-link>
          <router-link :to="'/revenue'" class="nav-link col-6 col-lg-auto">Revenue</router-link>
          <router-link :to="'/voice-actors'" class="nav-link col-6 col-lg-auto">VA</router-link>
          <router-link :to="'/timeline'" class="nav-link col-6 col-lg-auto">Timeline</router-link>

          <li class="nav-item dropdown col-12 col-lg-auto">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown">
            More
            </a>
            <div class="dropdown-menu">
              <router-link :to="'/xp'" class="dropdown-item">XP</router-link>
              <router-link :to="'/theme-skills'" class="dropdown-item">Theme Skills</router-link>
            </div>
          </li>
        </div>

        <hr class="d-lg-none text-gray">

        <a href="https://github.com/pm-random">
          <button class="btn btn-outline-primary" href="https://github.com/pm-random">View on Github</button>
        </a>
      </div>
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
.navbar-brand {
  display: inline-flex;
  gap: 6px;
}

nav {
  background-color: #f1f1f1;
  box-shadow: 0px 1px 3px #BBBBBB;
}

img {
  height: 40px;
}

a {
  text-decoration: none;
}
</style>
