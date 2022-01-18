<template>
  <TopBar/>
  <div class="page-content">  
    <h1>Timeline</h1>
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
    useHead({ title: "Timeline | PM Random" });
  },

  created() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.dateFormatter = new Intl.DateTimeFormat('en-UK', options);

    JSONFetch("timeline_letter").then(this.letterPrep);
    JSONFetch("timeline_version").then(this.versionPrep);
    JSONFetch("timeline_other").then(this.otherPrep);
  },

  data() {
    return {
      chartOptions: {
        chart: {
          zoomType: 'x',
          type: 'scatter'
        },
        credits: { enabled: false },
        xAxis: {
          type: 'datetime',
          visible: true,
          plotBands: this.plotBands()
        },
        yAxis: { visible: false },
        title: null,
        series: []
      }
    }
  },

  methods: {
    formatDate(isoDate) {
      return this.dateFormatter.format(Date.parse(isoDate))
    },

    plotBands() {
      const array = [];
      for (let year = 2019; year <= new Date().getFullYear(); year++) {
        array.push({
          from: Date.UTC(year, 0, 1),
          to: Date.UTC(year + 1, 0, 1),
          color: year % 2 ? "#FBFBFB" : "#F6F6F6",
          label: {
            text: year,
            style: {
              color: '#999999',
              fontSize: '18px',
              fontWeight: 'bold'
            },
            y: 25
          }
        });
      }
      return array;
    },

    basePrep(name, color) {
      return {
        name: name,
        color: color,
        marker: { symbol: 'circle' },
        tooltip: {
          pointFormat: '<b>{point.name}</b><br><i>{point.date}</i>'
        }
      }
    },

    letterPrep(json) {
      const base = this.basePrep("Dev Letter", "green");

      base.data = json.letters.map((value, index) =>
        ({
          x: Date.parse(value.date),
          y: 3,
          name: `Dev Letter ${index + 1}`,
          date: this.formatDate(value.date)
        })
      );

      this.chartOptions.series.push(base);
    },


    versionPrep(json) {
      const base = this.basePrep("Version", "red");

      base.data = json.map((value, index) =>
        ({
          x: Date.parse(value.date),
          y: 2,
          name: value.name,
          date: this.formatDate(value.date),
          marker: value.highlight ? { radius: 7, symbol: 'diamond' } : {}
        })
      );

      this.chartOptions.series.push(base);
    },

    otherPrep(json) {
      const base = this.basePrep("Other", "blue");

      base.data = json.map((value, index) =>
        ({
          x: Date.parse(value.date),
          y: 1,
          name: value.name,
          date: this.formatDate(value.date)
        })
      );

      this.chartOptions.series.push(base);
    }
  }
}
</script>
