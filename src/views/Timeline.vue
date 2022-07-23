<template>
  <div class="container-xxl">  
    <h1 class="m-3">Timeline</h1>
    <template v-if="loaded">
      <highcharts :options="chartOptions"></highcharts>
    </template>
    <div v-else class="spinner-grow m-3"></div>
  </div>
</template>


<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { getJson } from "@/data";
import { ref } from "vue";


interface Version {
  name: string,
  date: string,
  subtitle?: string,
  highlight?: boolean
}

interface Letter {
  name: string,
  date: string
}

interface Letters {
  baseUrl: string,
  languages: Array<string>,
  list: Array<Letter>
}

interface Milestone {
  name: string,
  date: string,
  link: string
}

interface Timeline {
  versions: Array<Version>,
  letters: Letters,
  milestones: Array<Milestone>
}

interface Point {
  x: number,
  y: number,
  name: string,
  date: string,
  marker?: { radius: number, symbol: string },
}


const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} (${dateFormatter.format(date)})`;
}

function plotBands() {
  const array = [];
  for (let year = 2019; year <= new Date().getFullYear(); year++) {
    array.push({
      from: Date.UTC(year, 0, 1),
      to: Date.UTC(year + 1, 0, 1),
      color: year % 2 ? "#FBFBFB" : "#F6F6F6",
      label: {
        text: year,
        style: { color: "#999999", fontSize: "18px", fontWeight: "bold", fontFamily: "Rajdhani" },
        y: 300
      }
    });
  }
  return array;
}

function createSeries(name: string, color: string, points: Array<Point>) {
  return {
    name: name,
    color: color,
    marker: { symbol: "circle" },
    tooltip: {
      pointFormat: "<b>{point.name}</b><br><i>{point.date}</i>"
    },
    data: points
  };
}

function versionToPoint(version: Version) {
  return {
    x: Date.parse(version.date),
    y: 3,
    name: version.name,
    date: formatDate(version.date),
    marker: version.highlight ? { radius: 7, symbol: "diamond" } : undefined
  };
}

function letterToPoint(letter: Letter, index: number) {
  return {
    x: Date.parse(letter.date),
    y: 2,
    name: `Dev Letter ${index + 1}`,
    date: formatDate(letter.date)
  };
}

function milestoneToPoint(milestone: Milestone) {
  return {
    x: Date.parse(milestone.date),
    y: 1,
    name: milestone.name,
    date: formatDate(milestone.date)
  };
}

function createChartOptions(timeline: Timeline) {
  return {
    chart: {
      type: "scatter",
      scrollablePlotArea: {
        minWidth: 750,
        scrollPositionX: 1,
      }
    },
    credits: { enabled: false },
    xAxis: {
      type: "datetime",
      visible: true,
      plotBands: plotBands()
    },
    yAxis: { visible: false },
    title: null,
    series: [
      createSeries("Version", "red", timeline.versions.map(versionToPoint)),
      createSeries("Dev Letter", "green", timeline.letters.list.map(letterToPoint)),
      createSeries("Milestone", "blue", timeline.milestones.map(milestoneToPoint))
    ]
  };
}


const loaded = ref(false);
const chartOptions = ref();

useHead({ title: "Timeline | PM Random" });
getJson<Timeline>("timeline")
  .then(timeline => {
    chartOptions.value = createChartOptions(timeline);
    // TODO: tables at the bottom of chart
    loaded.value = true;
  });
</script>
