<template>
  <div class="sign-maincontainer">
    <form>
      <b-field label="Email" v-bind:type="state" v-bind:message="mailMessage" v-if="user == null">
        <b-input type="email" v-model="email" v-on:focus="handleFocus()" maxlength="30"></b-input>
      </b-field>

      <b-checkbox v-if="user == null" class="chek" v-model="writer">Зарегистрироваться как писатель?</b-checkbox>

      <b-field
        label="Для входа введите пароль, отправленный в консоль"
        v-if="passwordNew && user == null && !notUser"
      >
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>

      <p v-if="user !== null">Вход выполнен</p>

      <div class="sign-buttons">
        <b-button
          v-on:click.prevent="handleSubmit()"
          type="is-primary"
          size="is-small"
          v-if="user == null"
        >{{passwordNew && !notUser ? "Войти" : "Зарегистрироваться"}}</b-button>
        <b-button
          type="is-primary"
          size="is-small"
          v-on:click.prevent="handleClick()"
        >{{user !== null ? 'Ок' : 'Назад'}}</b-button>
      </div>
    </form>
    <p v-if="notUser">Пользователь уже зарегистрирован</p>
  </div>
</template>

<script>
import {
  FETCH_REG,
  FETCH_SIGN,
  SET_NOT_USER,
  SET_PASSWORD_NEW
} from "../store/mutations.type";

export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      mailMessage: "",
      state: "",
      writer: false
    };
  },

  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
    notUser() {
      return this.$store.getters.notUser;
    },
    passwordNew() {
      return this.$store.getters.passwordNew;
    }
  },
  methods: {
    handleFocus() {
      // console.log('focus')

      if (this.notUser) {
        this.$store.commit(SET_PASSWORD_NEW, false);
      }

      this.mailMessage = "";
      this.state = "";
      this.$store.commit(SET_NOT_USER, false);
    },

    handleSubmit(evt) {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      console.log("submit");
      if (reg.test(this.email) == false) {
        //  this.email = ;
        this.mailMessage = "Введите корректный e-mail";
        this.state = "is-danger";
        return false;
      }

      if (this.passwordNew) {
        this.$store.dispatch(FETCH_SIGN, {
          email: this.email,
          password: this.password
        });
        this.$store.commit(SET_PASSWORD_NEW, false);
      } else {
        this.$store.dispatch(FETCH_REG, {
          email: this.email,
          role: this.writer ? "writer" : "reader"
        });
        this.$store.commit(SET_PASSWORD_NEW, false);
      }

      // this.$router.push("/");
    },
    handleClick() {
      this.mailMessage = "";
      this.state = "";
      this.$store.commit(SET_NOT_USER, false);
      this.$store.commit(SET_PASSWORD_NEW, false);
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
.chek {
  margin-bottom: 20px;
}
</style>
