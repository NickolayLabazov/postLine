import Vue from "vue";
import Vuex from "vuex";
import home from "./app.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home    
  }
});
