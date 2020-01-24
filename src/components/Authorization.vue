<template>
  <div class="authorization-maincontainer">
    <div class="authorization-input" v-if="user==null">
      <h5>Войдите на сайт или зарегистрируйтесь</h5>
      <div>
        <b-button type="is-primary" size="is-small" v-on:click="signIn()">Вход</b-button>
        <b-button type="is-primary" size="is-small" v-on:click="registration()">Регистрация</b-button>
      </div>
    </div>
    <div class="authorization-exit" v-if="user!==null">
      <h5>Вход выполнен</h5>
      <b-button type="is-primary" size="is-small" v-on:click="signOut()">Выход</b-button>
    </div>

    <!-- <form v-on:submit.prevent="handleSubmit()">
      <input type="text" v-bind:value="postInput" @input="getInput" />          
      <textarea cols="30" rows="10" v-bind:value="postText" @input="getText"></textarea>
      <button >{{update ? 'Сохранить' : 'Отправить'}}</button>
    </form>-->
  </div>
</template>

<script>
import {
  FETCH_UPDATE,
  FETCH_CREATE,
  SET_POST_INPUT,
  SET_POST_TEXT,
  SET_USER,
  SET_PASSWORD_NEW
} from "../store/mutations.type";

export default {
  name: "Authorization",

  computed: {
    user() {
      return this.$store.getters.currentUser;
    }
    /*  update() {
      return this.$store.getters.update;
    },   */
  },
  methods: {
    signIn() {
      this.$router.push("/signin");
    },
    registration() {
      this.$store.commit(SET_PASSWORD_NEW, false);
      this.$router.push("/registration");
    },
    signOut() {
      this.$store.commit(SET_USER, null);
    }
  }
};
</script>

<style  scoped>
.newdescription-maincontainer {
  display: flex;
}
form {
  display: flex;
  flex-direction: column;
}
button {
  cursor: pointer;
}
.authorization-maincontainer {
  width: 50%;
  display: flex;
}
.authorization-exit {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  display: flex;

  /* align-items: flex-start; */
  justify-content: space-around;
}

.authorization-input {
  width: 100%;
  display: flex;
  flex-direction: column;  
}
</style>
