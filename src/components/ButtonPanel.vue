<template>
  <div class="buttonpanel-maincontainer">
    <div class="buttonpanel-date">{{dateNow}}</div>
    <div v-if="user!==null" class="buttonpanel-buttonbox">
      <b-button type="is-primary" size="is-small" outlined v-if="user.role=='reader'" v-on:click="handleClaps()">{{post.claps}} хлопать</b-button>
      <b-button type="is-primary" size="is-small" outlined v-if="user.role=='writer'" v-on:click="handleUpdate()">изменить</b-button>
      <b-button type="is-primary" size="is-small" outlined v-if="user.role=='writer'" v-on:click="handleRemove()">удалить</b-button>
    
    </div>
  </div>
</template>

<script>
var moment = require("moment");
moment.locale("ru");

import { FETCH_CLAPS, FETCH_POST_REMOVE, SET_UPDATE, SET_CURRENT_POST_ID, SET_POST_INPUT,
  SET_POST_TEXT,} from "../store/mutations.type";



export default {
  name: "ButtonPanel",
  props: ["post"],
  computed: {
    dateNow() {
      let postDate = null;
      try{
      if (this.post.updateAt !== null) {
        postDate = `${this.post.updateAt.slice(0, 4)}${this.post.updateAt.slice(5, 7)}${this.post.updateAt.slice(8, 10)}${this.post.updateAt.slice(11, 13)}${this.post.updateAt.slice(14, 16)}`;
      } else {
        postDate = `${this.post.createdAt.slice(0, 4)}${this.post.createdAt.slice(5, 7)}${this.post.createdAt.slice(8, 10)}${this.post.createdAt.slice(11, 13)}${this.post.createdAt.slice(14, 16)}`;
      }
      console.log(postDate)
      return moment(postDate, "YYYYMMDDHHmm").fromNow();
      }catch(e){console.log(e)}
    },
    user() {
      return this.$store.getters.currentUser;
    },
  },
  methods:{
    handleClaps(){
      this.$store.dispatch(FETCH_CLAPS, this.post.id); 
      console.log("claps");
    }, 
    handleRemove(){
      this.$store.dispatch(FETCH_POST_REMOVE, this.post.id); 
      console.log("remove");
    }, 
    handleUpdate(){
      //this.$store.dispatch(FETCH_POST_REMOVE, this.post.id); 
      this.$store.commit(SET_UPDATE, true);
      this.$store.commit(SET_CURRENT_POST_ID, this.post.id); 

      this.$store.commit(SET_POST_INPUT, this.post.title); 
      this.$store.commit(SET_POST_TEXT, this.post.description);
      
      
      
      this.$router.push('newdescription')
      console.log("update");      
    }, 
  }
};
</script>

<style  scoped>
.buttonpanel-maincontainer {
  display: flex;
  align-items:flex-end;
}
.buttonpanel-buttonbox {
  margin-left: auto;
  display: flex;
}

.buttonpanel-date{
  
  font-size: 10px;
}











button{
  margin: 3px;
  cursor: pointer;
}
</style>
