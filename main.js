import Spectrogram from "./src/spectogram/index.js";

import { createApp } from "vue";

createApp({
  data() {
    return {
      isInit: false,
    };
  },
  methods: {
    initSpectoGram() {
      new Spectrogram({ el: "#Spectrogram" });
      this.isInit = true;
    },
  },
}).mount("#app");
