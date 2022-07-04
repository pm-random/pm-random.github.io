import { ref } from "vue";
import { defineStore } from "pinia";
import { getJson } from "@/data";

export const useMainStore = defineStore("main", () => {
  const version = ref();

  function refreshVersion() {
    getJson<string>("version").then(json => (version.value = json));
  }

  return { version, refreshVersion };
});
