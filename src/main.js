// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import Vuex from 'vuex';
import store from "./store";


import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy);

import { Table, Input, Button } from 'buefy'
//Vue.use(Table)
Vue.use(Input)
Vue.use(Button)


//Vue.use(Vuex);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount("#app");


