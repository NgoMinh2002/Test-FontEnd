/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
//Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store/index";
// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
const eventBus = createApp({});
export default eventBus;
registerPlugins(app);
app.use(store);
app.mount("#app");
