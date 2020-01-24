<template>
  <div class="newdescription-maincontainer">
    <form>
      <b-field label="Название">
        <b-input v-bind:value="postInput" @input="getInput"></b-input>
      </b-field>
      <b-field label="Сообщение">
        <b-input maxlength="200" type="textarea" v-bind:value="postText" @input="getText"></b-input>
      </b-field>
      <div class="desc-buttons">
        <b-button
          v-on:click.prevent="handleSubmit()"
          type="is-primary"
          size="is-small"
        >{{update ? 'Сохранить' : 'Отправить'}}</b-button>
        <b-button type="is-primary" size="is-small" v-on:click.prevent="handleClick()">Назад</b-button>
      </div>
    </form>
  </div>
</template>

<script>
var moment = require("moment");
moment.locale("ru");

import {
  FETCH_UPDATE,
  FETCH_CREATE,
  SET_POST_INPUT,
  SET_POST_TEXT
} from "../store/mutations.type";

export default {
  name: "NewDescription",
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
    },
    postInput() {
      return this.$store.getters.postInput;
    }
  },
  methods: {
    handleSubmit(evt) {
      const time = moment().format();
      if (this.update) {
        this.$store.dispatch(FETCH_UPDATE, {
          text: this.postText,
          time: time,
          title: this.postInput
        });
      } else {
        this.$store.dispatch(FETCH_CREATE, {
          text: this.postText,
          time: time,
          title: this.postInput
        });
      }
      this.$router.push("/");
    },
    getInput(e) {      
      this.$store.commit(SET_POST_INPUT, e);
    },
    getText(e) {
      this.$store.commit(SET_POST_TEXT, e);
    },
    handleClick() {
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
.desc-buttons {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
}
button {
  cursor: pointer;
}
</style>
