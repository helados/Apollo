import Vue from 'vue';
import axios from 'axios';

import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import router from './router';
import store from './store';
/* eslint-disable no-unused-vars */
import bus from './bus';

const remote = window.require('electron').remote;
const electronFs = remote.require('fs');

const settings = electronFs.readFileSync('settings.json');

global.sharedObj = settings;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(SuiVue);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
