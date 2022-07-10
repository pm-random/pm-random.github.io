<template>
  <div class="container-xxl">
    <h1 class="m-3">Revenue</h1>
    <div v-if="chartOptions.series.length == 0" class="spinner-grow m-3"></div>
    <div v-else class="card shadow-sm border border-3 my-3">
      <h4 class="m-2">Sensor Tower (Worldwide)</h4>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>                                                   
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useHead } from "@vueuse/head";
import { getJson } from "@/data";

interface Store {
  name: string,
  color: string
  data: Array<[string, number]>
}

interface StoreSeries {
  name: string,
  color: string
  data: Array<number | null>
}

useHead({ title: "Revenue | PM Random" });

const chartOptions = reactive({
  chart: {
    type: "spline",
    numberFormatter: (value: string) => `$${value}M`,
    scrollablePlotArea: {
      minWidth: 750,
      scrollPositionX: 1,
    },
    style: {
      fontFamily: "Arial, sans-serif"
    }
  },
  title: null,
  credits: { enabled: false },
  series: [],
  xAxis: {
    type: "datetime",
    labels: {
      style: { fontSize: "12px" },
      format: "{value:%B %Y}",
    },
  },
  yAxis: {
    title: null,
    labels: {
      style: { fontSize: "12px" },
    },
  },
  plotOptions: {
    spline: {
      marker: { symbol: "circle" },
      pointIntervalUnit: "month",
      pointStart: 0
    },
  },
});


getJson<Array<Store>>("revenue").then(stores => {
  const series: Array<StoreSeries> = [];
  const combinedData: Array<number | null> = [];

  stores.forEach(store => {
    series.push({
      name: store.name,
      color: store.color,
      data: store.data.map(entry => entry[1])
    });

    store.data.forEach((entry, index) => {
      if (combinedData.length <= index) {
        combinedData.push(entry[1]);
        return;
      }

      const current = combinedData[index];
      if (current == null) {
        return;
      }

      const amount = entry[1];
      if (amount == null) {
        combinedData[index] = null;
      } else {
        combinedData[index] = current + amount;
      }
    });
  });

  series.push({ name: "Combined", color: "#1111FF", data: combinedData });
  chartOptions.plotOptions.spline.pointStart = Date.parse(stores[0].data[0][0]);
  chartOptions.series = series as any;
});
</script>
