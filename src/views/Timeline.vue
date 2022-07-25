<template>
  <div class="container-xxl">  
    <h1 class="m-3">Timeline</h1>
    <template v-if="chartOptions != null">
      <div class="card border border-3 shadow-sm my-3 p-0">
        <highcharts :options="chartOptions"></highcharts>
      </div>

      <h3 class="my-3">Dev Letters</h3>
      <div class="card border border-3 shadow-sm my-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="letter in letters" :key="letter.link">
              <td>
                <a :href="letter.link">{{ letter.name }}</a>
              </td>
              <td>{{ letter.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="my-3">Milestones</h3>
      <div class="card border border-3 shadow-sm my-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="milestone in milestones" :key="milestone.name">
              <td>
                <a v-if="milestone.link" :href="milestone.link">{{ milestone.name }}</a>
                <template v-else>{{ milestone.name }}</template>
              </td>
              <td>{{ milestone.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  link: string,
  date: string
}

interface Milestone {
  name: string,
  date: string,
  link: string
}

interface Timeline {
  versions: Array<Version>,
  letters: Array<Letter>,
  milestones: Array<Milestone>
}

interface Point {
  x: number,
  y: number,
  name: string,
  date: string,
  marker?: { radius: number, symbol: string },
}


function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
    name: `Dev Letter #${index + 1}`,
    link: letter.link,
    date: formatDate(letter.date)
  };
}

function milestoneToPoint(milestone: Milestone) {
  return {
    x: Date.parse(milestone.date),
    y: 1,
    name: milestone.name,
    link: milestone.link,
    date: formatDate(milestone.date)
  };
}

function createChartOptions(versions: Array<Point>, letters: Array<Point>, milestones: Array<Point>) {
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
      createSeries("Version", "red", versions),
      createSeries("Dev Letter", "green", letters),
      createSeries("Milestone", "blue", milestones)
    ]
  };
}

const chartOptions = ref();
const letters = ref();
const milestones = ref();

useHead({ title: "Timeline | PM Random" });
getJson<Timeline>("timeline")
  .then(timeline => {
    const versions = timeline.versions.map(versionToPoint);
    letters.value = timeline.letters.map(letterToPoint);
    milestones.value = timeline.milestones.map(milestoneToPoint);
    chartOptions.value = createChartOptions(versions, letters.value, milestones.value);
  });
</script>
