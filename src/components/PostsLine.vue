<template>
  <div class="postsline-maincontainer">
    <Authorization />
    <div class="postsline-postcontainer" v-for="post in posts" v-bind:key="post.id">
      <Post v-bind:post="post" />
    </div>
    <div class="postsline-buttoncontainer">
      <b-button type="is-link" size="is-small" v-if="step>0" v-on:click="handleBack()">Назад</b-button>
      <b-button
        type="is-success"
        size="is-small"
        v-if="user!==null && user.role=='writer'"
        v-on:click="handleCreate()"
      >Добавить пост</b-button>
      <b-button
        type="is-link"
        size="is-small"
        v-if="usersSize / (step + 1) > 10"
        v-on:click="handleForward()"
      >Вперёд</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_POST_REMOVE,
  SET_UPDATE,
  SET_CURRENT_POST_ID,
  SET_POST_INPUT,
  SET_POST_TEXT,
  INCREASE_STEP,
  DECREASE_STEP,
  FETCH_POSTS
} from "../store/mutations.type";

import Post from "./Post.vue";
import Authorization from "./Authorization";

export default {
  name: "PostsLine",
  components: {
    Post,
    Authorization
  },
  computed: {
    ...mapGetters({
      myState: "myState",
      posts: "posts",
      user: "currentUser",
      step: "step",
      usersSize: "usersSize"
    })
  },
  methods: {
    handleCreate() {
      this.$store.commit(SET_UPDATE, false);
      this.$store.commit(SET_POST_INPUT, "");
      this.$store.commit(SET_POST_TEXT, "");
      this.$router.push("newdescription");
    },
    handleBack() {
      this.$store.commit(DECREASE_STEP);
      this.$store.dispatch(FETCH_POSTS);
    },
    handleForward() {
      this.$store.commit(INCREASE_STEP);
      this.$store.dispatch(FETCH_POSTS);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.postsline-buttoncontainer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.postsline-maincontainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.postsline-postcontainer {
  width: 50%;
}
</style>