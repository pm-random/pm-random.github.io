<template>
  <TopBar/>
  <div class="page-content">
    <h1>Revenue</h1>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import { JSONFetch } from '@/data.js';
import TopBar from "@/components/TopBar";

useHead({ title: "Revenue | PM Random" });


const chartOptions = ref({
  chart: {
    type: 'spline',
    numberFormatter: (value) => `$${value}M`,
    scrollablePlotArea: {
      minWidth: 750,
      scrollPositionX: 1
    }
  },
  title: { text: "Sensor Tower data (Worldwide)" },
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
});

function nullSum(row) {
  return row.reduce((acc, current) => (acc == null || current == null) ? null : acc + current);
}

JSONFetch("revenue").then(json => {
  json.stores.forEach((store, index) => store.data = json.data.map(row => row[index + 1]));
  json.stores.push({
    name: "Combined",
    color: "#1111FF", 
    data: json.data.map(row => nullSum(row.slice(1)))
  });
  chartOptions.value.plotOptions.spline.pointStart = Date.parse(json.data[0][0]);
  chartOptions.value.series = json.stores;
});
</script>
