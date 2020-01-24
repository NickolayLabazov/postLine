<template>
  <div class="post">
    <div class="post-title">{{post.title}}</div>
    <div class="post-description">{{post.description}}</div>
    <ButtonPanel v-bind:post="post" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ButtonPanel from "./ButtonPanel.vue";

export default {
  name: "Post",
  components: {
    ButtonPanel
  },
  props: ["post"]
};
</script>

<style  scoped>
.post {
  width: 100%;
  padding-left: 5px;
  margin-top: 10px;
  border: 1px grey solid;
  text-align: left;
}
.post-title {
  font-size: 16px;
}
.post-description {
  font-size: 12px;
}
</style>