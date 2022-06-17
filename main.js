import Spectrogram from "./src/spectogram/index.js";
import { getObservations } from "./src/inaturalist/index.js";

import { createApp } from "vue";

createApp({
  data() {
    return {
      isInit: false,
    };
  },
  async created() {
    const res = await getObservations();
    console.log(res);
  },
  methods: {
    initSpectoGram() {
      new Spectrogram({ el: "#Spectrogram" });
      this.isInit = true;
    },
  },
}).mount("#app");
