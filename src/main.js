import Vue from 'vue';
import FlagIcon from 'vue-flag-icon';
import App from './App.vue';
import { i18n } from './languages/index';
import { router } from './routes/router';
import {store} from './store/store';

Vue.use(FlagIcon);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  i18n,
  store
})
