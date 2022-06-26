<template>
  <TopBar />
  <div class="page-content">
    <h1>XP</h1>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { JSONFetch } from "@/data.ts";
import TopBar from "@/components/TopBar.vue";

useHead({ title: "XP | PM Random" });

const data = ref(null);

const chartOptions = ref({
  chart: { type: "spline" },
  title: null,
  credits: { enabled: false },
  xAxis: {
    title: { text: "Level" },
    labels: {
      style: { fontSize: "12px" },
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
      marker: {
        symbol: "circle",
        enabled: false,
      },
    },
  },
});

JSONFetch("level_up").then(json => {
  data.value = Object.entries(json.level_xp).map(entry => {
    return {
      name: entry[0],
      data: entry[1].map((xp, index) => [index + 1, xp]),
    };
  });
  chartOptions.value.series = data;
});
</script>
