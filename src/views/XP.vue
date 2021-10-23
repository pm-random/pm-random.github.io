<template>
  <HeaderBar/>
  <h1>XP</h1>
  <line-chart :library="chartOptions" :data="displayedData"></line-chart>
</template>

<script>
import { useHead } from '@vueuse/head';
import HeaderBar from "@/components/HeaderBar"
import { JSONFetch } from '@/data.js';


export default {
  components: { HeaderBar },

  setup() {
    useHead({ title: "XP | PM Random" });
  },

  created() {
    JSONFetch("level_up").then(json => {
      this.rawData = Object.entries(json.level_xp).map(entry => {
        return {
          name: entry[0],
          data: entry[1].map((xp, index) => [index + 1, xp])
        }
      });
      this.displayedData = this.rawData;
    });
  },

  data() {
    return {
      rawData: null,
      displayedData: null,
      chartOptions: {
        plotOptions: {
          series: {
            marker: { enabled: false }
          }
        }
      }
    }
  }
}
</script>