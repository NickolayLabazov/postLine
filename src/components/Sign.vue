<template>
  <div class="sign-maincontainer">
    <form>
      <b-field label="Email" v-bind:type="state" v-bind:message="mailMessage" v-if="user == null">
        <b-input type="email" v-model="email" v-on:focus="handleFocus()" maxlength="30"></b-input>
      </b-field>

      <b-field label="Password" v-if="user == null">
        <b-input type="password" v-model="password" v-on:focus="handleFocus()" password-reveal></b-input>
      </b-field>
      <p v-if="user !== null">Вход выполнен</p>
      <div class="sign-buttons">
        <b-button
          v-on:click.prevent="handleSubmit()"
          type="is-primary"
          size="is-small"
          v-if="user == null"
        >Войти</b-button>
        <b-button
          type="is-primary"
          size="is-small"
          v-on:click.prevent="handleClick()"
        >{{user !== null ? 'Ок' : 'Назад'}}</b-button>
      </div>
    </form>
    <p v-if="notUser">Пользователь не зарегистрирован</p>
  </div>
</template>

<script>
import { FETCH_SIGN, SET_NOT_USER } from "../store/mutations.type";

export default {
  name: "Sign",
  data() {
    return {
      email: "",
      password: "",
      mailMessage: "",
      state: ""
    };
  },

  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
    notUser() {
      return this.$store.getters.notUser;
    }
  },
  methods: {
    handleFocus() {
      this.mailMessage = "";
      this.state = "";
      this.$store.commit(SET_NOT_USER, false);
    },

    handleSubmit(evt) {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(this.email) == false) {
        this.mailMessage = "Введите корректный e-mail";
        this.state = "is-danger";
        return false;
      }
      this.$store.dispatch(FETCH_SIGN, {
        email: this.email,
        password: this.password
      });
    },
    handleClick() {
      this.mailMessage = "";
      this.state = "";
      this.$store.commit(SET_NOT_USER, false);
      this.$router.push("/");
    }
  }
};
</script>

<style  scoped>
.sign-maincontainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.sign-buttons {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
}
button {
  cursor: pointer;
}
</style>