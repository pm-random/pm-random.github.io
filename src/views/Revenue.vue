<template>
  <HeaderBar/>
  <h1>Revenue</h1>
  <h2>Sensor Tower data (Worldwide)</h2>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { useHead } from '@vueuse/head';
import HeaderBar from "@/components/HeaderBar"
import { JSONFetch } from '@/data.js';


export default {
  components: { HeaderBar },

  setup() {
    useHead({ title: "Revenue | PM Random" })
  },

  created() {
    JSONFetch("revenue").then(json => {
      json.push({
        name: "Combined",
        color: "#1111FF", 
        data: Object.entries(json.map(store => store.data).reduce(this.dataMerger, {}))
      });
      this.chartOptions.series = json;
      this.chartOptions.xAxis.categories = json[0].data.map(x => x[0]);
    });
  },

  data() {
    return {
      chartData: null,
      chartOptions: {
        chart: {
          type: 'spline',
          numberFormatter: (value) => `$${value}M`
        },
        title: null,
        credits: { enabled: false },
        xAxis: {
          labels: {
            style: { fontSize:'12px' }
          }
        },
        yAxis: {
          title: null,
          labels: {
            style: { fontSize:'12px' }
          }
        },
        plotOptions: {
          spline: {
            marker: { symbol: 'circle' },
          }
        }
      }
    }
  },

  methods: {
    dataMerger(map, tuples) {
      tuples.forEach(tuple => {
        let [k, v] = tuple;
        if (v == null) {
          map[k] = null;
        } else if (k in map) {
          map[k] = map[k] == null ? null : map[k] + v
        } else {
          map[k] = v
        }
      });
      return map;
    }
  }
}
</script>