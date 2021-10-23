<template>
  <HeaderBar/>
  <h1>Revenue</h1>
  <h2>Sensor Tower data (Worldwide)</h2>
  <line-chart :data="chartData" prefix="$" suffix="M"></line-chart>
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
        data: json.map(store => store.data).reduce(this.dataMerger, {})
      });
      this.chartData = json
    });
  },

  data() {
    return {
      chartData: null
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