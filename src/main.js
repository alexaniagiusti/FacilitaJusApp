import Vue from 'vue';
import { rtdbPlugin } from 'vuefire';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import DisableAutocomplete from 'vue-disable-autocomplete';

import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(rtdbPlugin);
Vue.config.productionTip = false;
Vue.use(DisableAutocomplete);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
