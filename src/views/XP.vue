<template>
  <TopBar/>
  <div class="page-content">
    <h1>XP</h1>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>


<script>
import { useHead } from '@vueuse/head';
import TopBar from "@/components/TopBar"
import { JSONFetch } from '@/data.js';


export default {
  components: { TopBar },

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
      this.chartOptions.series = this.rawData;
    });
  },

  data() {
    return {
      rawData: null,
      chartOptions: {
        chart: { type: "spline" },
        title: null,
        credits: { enabled: false },
        xAxis: {
          title: { text: "Level" },
          labels: {
            style: { fontSize: "12px" },
          }
        },
        yAxis: {
          title: { text: "Experience" },
          labels: {
            style: { fontSize: "12px" }
          }
        },
        plotOptions: {
          spline: {
            marker: {
              symbol: "circle",
              enabled: false
            }
          }
        }
      }
    }
  }
}
</script>
