<template>
  <TopBar/>
  <div class="page-content">
    <h1>Revenue</h1>
    <h2>Sensor Tower data (Worldwide)</h2>
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
    useHead({ title: "Revenue | PM Random" })
  },

  created() {
    JSONFetch("revenue").then(json => {
      json.stores.forEach((store, index) => store.data = json.data.map(row => row[index + 1]));
      json.stores.push({
        name: "Combined",
        color: "#1111FF", 
        data: json.data.map(row => this.nullSum(row.slice(1)))
      });
      this.chartOptions.plotOptions.spline.pointStart = Date.parse(json.data[0][0]);
      this.chartOptions.series = json.stores;
    });
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: 'spline',
          numberFormatter: (value) => `$${value}M`,
          scrollablePlotArea: {
            minWidth: 750,
            scrollPositionX: 1
          }
        },
        title: null,
        credits: { enabled: false },
        xAxis: {
          type: 'datetime',
          labels: {
            style: { fontSize:'12px' },
            format: '{value:%B %Y}',
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
            pointIntervalUnit: 'month'
          }
        }
      }
    }
  },

  methods: {
    nullSum(row) {
      return row.reduce((acc, current) => (acc == null || current == null) ? null : acc + current);
    }
  }
}
</script>
