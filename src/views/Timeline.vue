<template>
  <HeaderBar/>
  <h1>Timeline</h1>
  <highcharts :options="chartOptions"></highcharts>
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
    JSONFetch("dev_letter").then(this.letterPrep);
    JSONFetch("versions").then(this.versionPrep);
    JSONFetch("announcements").then(this.annoPrep);
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
      let [year, month, day] = isoDate.split('-');
      return `${day}/${month}/${year}`;
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
              color: '#888888',
              fontSize: '18px',
              fontWeight: 'bold'
            },
            y: 25
          }
        });
      }
      return array;
    },

    letterPrep(json) {
      const base = {
        name: "Dev Letter",
        color: "green",
        marker: { symbol: 'circle' },
        tooltip: {
          pointFormat: '<b>#{point.number}</b> - {point.date}'
        }
      }

      base.data = json.letters.map((value, index) =>
        ({
          x: Date.parse(value.date),
          y: 3,
          number: index + 1,
          date: this.formatDate(value.date)
        })
      );

      this.chartOptions.series.push(base);
    },


    versionPrep(json) {
      const base = {
        name: "Version",
        color: "red",
        marker: { symbol: 'circle' },
        tooltip: {
          pointFormat: '<b>{point.name}</b> - {point.date}'
        }
      }

      base.data = json.map((value, index) =>
        ({
          x: Date.parse(value.date),
          y: 2,
          name: value.name,
          date: this.formatDate(value.date)
        })
      );

      this.chartOptions.series.push(base);
    },

    annoPrep(json) {
      const base = {
        name: "Major Announcement",
        color: "blue",
        marker: { symbol: 'diamond' },
        tooltip: {
          pointFormat: '<b>{point.name}</b> - {point.date}'
        }
      }

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