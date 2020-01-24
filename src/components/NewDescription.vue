<template>
  <div class="newdescription-maincontainer">
    <form >
      <b-field label="Название">
            <b-input v-bind:value="postInput" @input="getInput"></b-input>
        </b-field>
     <!--  <input type="text" v-bind:value="postInput" @input="getInput" />     -->      
<!--       <textarea cols="30" rows="10" v-bind:value="postText" @input="getText"></textarea>
 -->      
<b-field label="Сообщение">
            <b-input maxlength="200" type="textarea" v-bind:value="postText" @input="getText"></b-input>
        </b-field>

      <div class="desc-buttons">
      <b-button v-on:click.prevent="handleSubmit()" type="is-primary"
          size="is-small">{{update ? 'Сохранить' : 'Отправить'}}</b-button>
          <b-button
          type="is-primary"
          size="is-small"
          v-on:click.prevent="handleClick()"
        >Назад</b-button>
</div>

    </form>
  </div>
</template>

<script>
var moment = require("moment");
moment.locale("ru");




import { FETCH_UPDATE, FETCH_CREATE, SET_POST_INPUT, SET_POST_TEXT, } from "../store/mutations.type";

export default {
  name: "NewDescription",
 /*  mounted: function(){
     this.$store.commit(SET_POST_INPUT, this.postInput); 
      this.$store.commit(SET_POST_TEXT, this.postText);    
  }, */
  data() {
    return {
      text: "",
      title: "",
      n: this.postText
    };
  },
  computed: {
    update() {
      return this.$store.getters.update;
    },
    currentPostId() {
      return this.$store.getters.currentPostId;
    },
    postText() {
      return this.$store.getters.postText;
      /* const index = this.$store.getters.posts.indexOf(
        this.$store.getters.posts.filter(
          item => item.id == this.$store.getters.currentPostId
        )[0]
      );
      console.log(this.$store.getters.posts[index].description);
      return this.$store.getters.posts[index].description; */
    },
     postInput() {
       return this.$store.getters.postInput;
     /*  const index = this.$store.getters.posts.indexOf(
        this.$store.getters.posts.filter(
          item => item.id == this.$store.getters.currentPostId
        )[0]
      );
      console.log(this.$store.getters.posts[index].title);
      return this.$store.getters.posts[index].title; */
    }
  },
  methods: {
    handleSubmit(evt) {
      const time = moment().format();

      console.log(this.getInput)

      if (this.update) {
        //console.log(form.input.value)
        this.$store.dispatch(FETCH_UPDATE, { text: this.postText, time: time, title: this.postInput });
      } else {
        this.$store.dispatch(FETCH_CREATE, {
          text: this.postText,
          time: time,
          title: this.postInput,
        });
      }
      this.$router.push("/");
      // this.$store.dispatch(FETCH_CLAPS, this.post.id);
      // this.$store.getters('update');
      console.log(this.$store.getters.update);
    },
    getInput(e){
      console.log(e);
      this.$store.commit(SET_POST_INPUT, e)
     // console.log(e.target.value)
     // return e.target.value;
    },
    getText(e){
      this.$store.commit(SET_POST_TEXT, e)
     // console.log(e.target.value)
     // return e.target.value;
    },
    handleClick() {
     // this.mailMessage = "";
     // this.state = "";
    //  this.$store.commit(SET_NOT_USER, false);
      this.$router.push("/");
    }
  }
};
</script>

<style  scoped>
.newdescription-maincontainer {
  display: flex;
  
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.desc-buttons{
display: flex;
flex-direction: row-reverse;
justify-content: space-around;
}
button {
  cursor: pointer;
}
</style>
