<template>
  <span id="all" :style="style">
    <span id="name">PM Random</span>
    <sup id="version">{{ version }}</sup>
  </span>
</template>


<script>
import { JSONFetch } from '@/data'

export default {
  props: {
    home: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        "--name-size": `${this.home ? 48 : 28}px`,
        "--version-size": `${this.home ? 36 : 20}px`
      }
    }
  },
  created() {
    JSONFetch("version").then(json => this.version = json);
  },
  data() {
    return {
      version: null
    }
  }
}
</script>


<style scoped>
#all {
  font-family: 'Rajdhani', sans-serif;
}

#name {
  color: black;
  font-size: var(--name-size);
}

#version {
  color: var(--accent-color);
  font-size: var(--version-size);
}
</style>
