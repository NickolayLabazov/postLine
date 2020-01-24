<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
    <!-- <p v-on:click="setState()">{{myState}}</p> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { FETCH_USERS, FETCH_POSTS} from "./store/mutations.type";


export default {
  name: "App",
  computed: {
    ...mapGetters({
      myState: "myState"
    })
  },
  methods: {
    // setState(){
    //    console.log(SET_TAGS);
    //   this.$store.commit(SET_TAGS, 1);
    //  }
    ...mapMutations({
     // SET_TAGS

      
    }),

    SET_TAGS() {
      this.SET_TAGS({ myState: 2 });
    }
  },
  mounted: function(){
     this.$store.dispatch(FETCH_USERS);
     this.$store.dispatch(FETCH_POSTS);     
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
