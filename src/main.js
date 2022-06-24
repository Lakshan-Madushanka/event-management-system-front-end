import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FloatingVue from "floating-vue";
import VCalendar from "v-calendar";

import "floating-vue/dist/style.css";
import "./assets/tailwind.css";
import "v-calendar/dist/style.css";

window.store = store;

const app = createApp(App);

app.use(store).use(router);
app.use(FloatingVue);
app.use(VCalendar, {});

app.mount("#app");
