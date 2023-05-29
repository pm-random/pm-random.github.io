import { reactive, readonly } from "vue";
import { fetch_cdn_data } from "./cdn";

const state = reactive({
  version: ""
});

function update_version() {
  fetch_cdn_data<string>("version").then((v) => (state.version = v));
}

export default {
  state: readonly(state),
  update_version
};
