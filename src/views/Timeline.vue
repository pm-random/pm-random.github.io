<template>
  <HeaderBar/>
  <h1>Timeline</h1>
</template>

<script>
import { useHead } from '@vueuse/head';
import HeaderBar from "@/components/HeaderBar"
import { JSONFetch } from '@/data.js';


export default {
  components: { HeaderBar },

  setup() {
    useHead({ title: "Timeline | PM Random" });
  },

  created() {
    JSONFetch("dev_letter").then(json => {

    });
  },

  data() {
    return {

    }
  }
}
</script>