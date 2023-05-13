import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { createPinia, PiniaVuePlugin } from "pinia";
//Plugins
import alert from "@/plugins/alert";
import loading from "@/plugins/loading";
import PluginHelper from "@/helpers/PluginHelper";
import utils from "@/plugins/utils";
import dialog from "@/plugins/dialog";
import moment from "moment";
import { rules } from "@/plugins/rules";
import { vueFilterRegister } from "@/plugins/filter";
import { markRaw } from "vue";

Vue.config.productionTip = false;
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
Vue.use(PiniaVuePlugin);
Vue.use(
  PluginHelper.create({
    $utils: utils,
    $rules: rules,
    $dialog: dialog,
    $alert: alert,
    $loading: loading,
    $baseUrl: process.env.VUE_APP_API_ENDPOINT,
    $moment: moment,
  })
);
vueFilterRegister();

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
