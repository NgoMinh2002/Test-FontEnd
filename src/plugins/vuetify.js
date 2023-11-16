/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// Composables
import { VDatePicker } from "vuetify/lib/labs/components.mjs";
import { VuetifyDateAdapter } from "vuetify/labs/date/adapters/vuetify";
// Composables
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
    VDatePicker,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
  date: {
    adapter: VuetifyDateAdapter,
  },
});
