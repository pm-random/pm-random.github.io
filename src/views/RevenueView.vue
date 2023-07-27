<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";;
import { Chart as HighchartsChart } from "highcharts-vue";
import { fetch_cdn_data } from "@/cdn";

interface Store {
  name: string;
  color: string;
}

interface RevenueMonth {
  period: string;
  values: Array<number>;
}

interface Revenue {
  stores: Array<Store>;
  months: Array<RevenueMonth>;
}

const chartOptions = ref();

useTitle("Revenue | PM Random");

fetch_cdn_data<Revenue>("revenue").then((revenue) => {
  chartOptions.value = {
    chart: {
      type: "spline",
      numberFormatter: (value: number) => `$${value}M`,
      scrollablePlotArea: {
        minWidth: 750,
        scrollPositionX: 1
      },
      spacingTop: 15,
      spacingBottom: 10
    },
    series: revenue.stores.map((store, index) => {
      return {
        name: store.name,
        color: store.color,
        data: revenue.months.map((month) => [month.period, month.values[index]])
      };
    }),
    plotOptions: {
      spline: {
        marker: { symbol: "circle" },
        pointIntervalUnit: "month",
        pointStart: Date.parse(revenue.months[0].period),
        lineWidth: 2
      }
    },
    title: null,
    credits: { enabled: false },
    legend: {
      itemStyle: { fontWeight: "bold" }
    },
    tooltip: {
      animation: false,
      shared: true,
      borderWidth: 1,
      shadow: null,
      headerFormat: '<div style="font-size: 0.75rem">{point.x:%B %Y}</div><br/>'
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%B %Y}"
      },
      crosshair: true
    },
    yAxis: {
      title: null
    }
  };
});
</script>

<template>
  <div>
    <h1>Revenue</h1>
    <h2>Sensor Tower (Worldwide)</h2>
    <div v-if="chartOptions != undefined" class="card my-3">
      <HighchartsChart :options="chartOptions" />
    </div>
  </div>
</template>
