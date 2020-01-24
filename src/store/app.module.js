import {
  SET_USERS,
  SET_POSTS,
  SET_UPDATE,
  SET_CURRENT_POST_ID,
  SET_POST_INPUT,
  SET_POST_TEXT,
  FETCH_USERS,
  FETCH_POSTS,
  FETCH_CLAPS,  
  FETCH_POST_REMOVE,
  FETCH_UPDATE,
  FETCH_CREATE,
  FETCH_SIGN,
  SET_USER,
  SET_NOT_USER,
  INCREASE_STEP,
  DECREASE_STEP,
  SET_USERSSIZE,
  FETCH_REG,
  SET_PASSWORD_NEW
} from "./mutations.type";

const url = 'http://localhost:7070';

const state = {
  users: null,
  currentUser: null,
  step: 0,
  usersSize: null,
  posts: null,
  update: false,
  currentPostId: null,
  postInput: '',
  postText: '',
  notUser: false,
  passwordNew: false,
};

const getters = {
  posts(state) {
    return state.posts;
  },
  update(state) {
    return state.update;
  },
  currentPostId(state) {
    return state.currentPostId;
  },
  postInput(state) {
    return state.postInput;
  },
  postText(state) {
    return state.postText;
  },
  currentUser(state) {
    return state.currentUser;
  },
  notUser(state) {
    return state.notUser;
  },
  step(state) {
    return state.step;
  },
  usersSize(state) {
    return state.usersSize;
  },
  passwordNew(state) {
    return state.passwordNew;
  },
};

const actions = {
  async [FETCH_USERS]({ commit }) {
    const response = await fetch(`${url}/users/`);
    if (!response.ok) {
      this.$store.dispatch(FETCH_USERS);
    }
    const users = await response.json();
    commit(SET_USERS, users);
  },
  async [FETCH_POSTS]({ commit }) {
    const response = await fetch(`${url}/posts/${state.step}`);
    if (!response.ok) {
      this.$store.dispatch(FETCH_POSTS);
    }
    const posts = await response.json();
    commit(SET_USERSSIZE, posts.size);
    commit(SET_POSTS, posts.posts);
  },
  async [FETCH_CLAPS]({ commit }, id) {
    const index = state.posts.indexOf(state.posts.filter(item => item.id == id)[0])
    const response = await fetch(`${url}/claps/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "id": id,
      }),
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_CLAPS);
    } else {
      const post = await response.json();
      let newPosts = state.posts.slice(0, index).concat(post).concat(state.posts.slice(index + 1));
      commit(SET_POSTS, newPosts)
    }
  },
  async [FETCH_POST_REMOVE]({ commit }, id) {
    const index = state.posts.indexOf(state.posts.filter(item => item.id == id)[0]);
    const response = await fetch(`${url}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_POSTS);
    } else {
      let newPosts = state.posts.slice(0, index).concat(state.posts.slice(index + 1));
      commit(SET_POSTS, newPosts)
    }
  },
  async [FETCH_UPDATE]({ commit }, obj) {
    const response = await fetch(`${url}/update/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "title": obj.title,
        "description": obj.text,
        "id": state.currentPostId,
        "updateAt": obj.time,
      }),
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_UPDATE, text);
    } else {
      const post = await response.json();
      const index = state.posts.indexOf(state.posts.filter(item => item.id == post.id)[0]);
      const newPosts = state.posts.slice(0, index).concat(post).concat(state.posts.slice(index + 1));
      commit(SET_POSTS, newPosts);
    }
  },
  async [FETCH_CREATE]({ commit }, obj) {
    const response = await fetch(`${url}/create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "description": obj.text,
        "title": obj.title,
        "createdAt": obj.time,
        "userId": state.currentUser.id,
      }),
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_CREATE, obj);
    } else {
      const post = await response.json();
      commit(SET_POSTS, state.posts.concat(post));

    }
  },
  async [FETCH_SIGN]({ commit }, obj) {
    const response = await fetch(`${url}/sign/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_SIGN, obj);
    } else {
      const user = await response.json();
      if (user) {
        commit(SET_USER, user);
      } else {
        commit(SET_NOT_USER, true);
      }
    }
  },

  async [FETCH_REG]({ commit }, obj) {
    const response = await fetch(`${url}/reg/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_REG, obj);
    } else {
      const resp = await response.json();
      if (!resp) {
        commit(SET_NOT_USER, true);
      }
      commit(SET_PASSWORD_NEW, true);
      console.log(resp)
    }
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [SET_USERS](state, users) {
    state.users = users;
  },
  [SET_POSTS](state, posts) {
    state.posts = posts;

  },
  [SET_UPDATE](state, value) {
    state.update = value;
  },
  [SET_CURRENT_POST_ID](state, id) {
    state.currentPostId = id;
  },
  [SET_POST_INPUT](state, input) {
    state.postInput = input;
  },
  [SET_POST_TEXT](state, text) {
    state.postText = text;
  },
  [SET_USER](state, user) {
    state.currentUser = user;
  },
  [SET_NOT_USER](state, value) {
    state.notUser = value;    
  },
  [INCREASE_STEP](state) {
    state.step = state.step + 1;
  },
  [DECREASE_STEP](state) {
    state.step = state.step - 1;
  },
  [SET_USERSSIZE](state, size) {
    state.usersSize = size;
  },
  [SET_PASSWORD_NEW](state, value) {
    state.passwordNew = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};