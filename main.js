import Spectrogram from "./src/spectogram/index.js";
import { getObservations } from "./src/inaturalist/index.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDY-acv5Cu8dls1EsFZvbJ17-CjEROND3s",
  authDomain: "flora-valldaura.firebaseapp.com",
  databaseURL:
    "https://flora-valldaura-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flora-valldaura",
  storageBucket: "flora-valldaura.appspot.com",
  messagingSenderId: "90774044033",
  appId: "1:90774044033:web:ea97b282e25e7107d83c80",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      temperature: 0,
      humidity: 0,
    };
  },
  async mounted() {
    this.initSpectoGram();
    const res = await getObservations();
    const readingsRef = ref(database, "latest");
    onValue(readingsRef, (snapshot) => {
      const data = snapshot.val();
      this.temperature = data.temperature;
      this.humidity = data.humidity;
    });
  },
  methods: {
    initSpectoGram() {
      new Spectrogram({ el: "#Spectogram" });
    },
  },
}).mount("#app");
