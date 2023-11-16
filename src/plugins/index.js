/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import * as VeeValidate from "vee-validate";
import { Field, Form, ErrorMessage } from "vee-validate";

import "vuetify/dist/vuetify.min.css";
import { defineRule, configure } from "vee-validate";
import { required, email } from "@vee-validate/rules";

import axios from "axios";
import VueAxios from "vue-axios";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "@mdi/font/css/materialdesignicons.min.css";
defineRule("required", required);
defineRule("email", email);

// Sử dụng vee-validate
configure({
  generateMessage: (context) => {
    const messages = {
      required: `Trường ${context.field} là bắt buộc.`,
      email: `Trường ${context.field} phải là một địa chỉ email hợp lệ.`,
    };

    const message = messages[context.rule.name];
    return message;
  },
});

export function registerPlugins(app) {
  loadFonts();
  app
    .use(vuetify)
    .use(router)
    .use(VeeValidate)
    .use(VueAxios, axios)
    .use(CKEditor);
}

export function registerComponents(app) {
  app.component("Field", Field);
  app.component("Form", Form);
  app.component("ErrorMessage", ErrorMessage);
}
