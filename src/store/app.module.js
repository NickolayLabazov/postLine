//import { TagsService, ArticlesService } from "@/common/api.service";
//import { FETCH_ARTICLES, FETCH_TAGS } from "./actions.type";
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
  UPDATE_POSTS,
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

const state = {
  users: null,
  currentUser: null,
  step: 0,
  usersSize: null,

  /*  currentUser: {
    "id": 1,
    "login": "writer@mail.com",
    "password": 123456,
    "role": "writer"
  },  */
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
    const response = await fetch(`http://localhost:7070/users/`);
    if (!response.ok) {
      this.$store.dispatch(FETCH_USERS);
    }
    const users = await response.json();
    commit(SET_USERS, users);
  },
  async [FETCH_POSTS]({ commit }) {
    const response = await fetch(`http://localhost:7070/posts/${state.step}`);
    if (!response.ok) {
      this.$store.dispatch(FETCH_POSTS);
    }
    const posts = await response.json();
    commit(SET_USERSSIZE, posts.size);
    commit(SET_POSTS, posts.posts);
    
  },
  async [FETCH_CLAPS]({ commit }, id) {
    //let updatePost = state.posts[0];
    //let newClap = state.posts[0].claps + 1;
    //console.log(newClack)
    // console.log(updatePost)
    const index = state.posts.indexOf(state.posts.filter(item => item.id == id)[0])    
    const response = await fetch('http://localhost:7070/claps/', {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "index": index,
      }),
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_CLAPS);
    } else {      
      const post = await response.json(); 
      console.log(post)    ;
     let newPosts = state.posts.slice(0, index).concat(post).concat(state.posts.slice(index+1));
      commit(SET_POSTS, newPosts)
    }
  },
  async [FETCH_POST_REMOVE]({ commit }, id) {
    const index = state.posts.indexOf(state.posts.filter(item => item.id == id)[0]);
    console.log(index)
    const response = await fetch(`http://localhost:7070/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_POSTS);
    }else {              
     let newPosts = state.posts.slice(0, index).concat(state.posts.slice(index+1));
      commit(SET_POSTS, newPosts)
    }
   // const posts = await response.json();
   // commit(SET_POSTS, posts);
  },
  async [FETCH_UPDATE]({ commit }, obj) {    
    //console.log(time)    
    const response = await fetch('http://localhost:7070/update/', {
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
      console.log(post)    
     const newPosts = state.posts.slice(0, index).concat(post).concat(state.posts.slice(index+1));
      commit(SET_POSTS, newPosts);
      
    }
  },
  async [FETCH_CREATE]({ commit }, obj) {    
    //console.log(time)    
    const response = await fetch('http://localhost:7070/create/', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "description": obj.text,
        "title":  obj.title,
        
        "createdAt": obj.time,
        "userId": state.currentUser.id,
      }),
    });
    if (!response.ok) {
      this.$store.dispatch(FETCH_CREATE, obj);
    } else {      
      const post = await response.json(); 
    //  const index = state.posts.indexOf(state.posts.filter(item => item.id == post.id)[0]);
      console.log(post)    
  //   const newPosts = state.posts.slice(0, index).concat(post).concat(state.posts.slice(index+1));
       commit(SET_POSTS, state.posts.concat(post));
      
    }
  },
  async [FETCH_SIGN]({ commit }, obj) {    
    //console.log(time)    
    const response = await fetch('http://localhost:7070/sign/', {
   // const response = await fetch('http://localhost:7070/reg/', {
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
      if(user){
        commit(SET_USER, user);
      }else{
        commit(SET_NOT_USER, true);
      }
    }
  },

  async [FETCH_REG]({ commit }, obj) {    
    console.log('reg')    
    const response = await fetch('http://localhost:7070/reg/', {
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
      if(!resp){
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
    console.log(state.posts)
  },
  [UPDATE_POSTS](state, post, index) {
    
    //state.posts = state.posts.slice(0, index).concat(post).concat(state.posts.slice(index+1));
    
  },
  [SET_UPDATE](state, value) {
    state.update = value;
    console.log(state.update)
  },
  [SET_CURRENT_POST_ID](state, id) {
    state.currentPostId = id;
    console.log(state.currentPostId)
  },
  [SET_POST_INPUT](state, input) {
    state.postInput = input;
    console.log(state.postInput)
  },
  [SET_POST_TEXT](state, text) {
    state.postText = text;
    console.log(state.postText)
  },
  [SET_USER](state, user) {
    state.currentUser = user;
    console.log(state.currentUser)
  },
  [SET_NOT_USER](state, value) {
    state.notUser = value;
    console.log(state.notUser)
  },
  [INCREASE_STEP](state) {
    state.step = state.step + 1;
    console.log(state.step)
  },
  [DECREASE_STEP](state) {
    state.step = state.step - 1;
    console.log(state.step)
  },
  [SET_USERSSIZE](state, size) {
    state.usersSize = size;
    console.log(state.usersSize)
  },
  [SET_PASSWORD_NEW](state, value) {
    state.passwordNew = value;
    console.log(state.passwordNew)
  },


  

  
};

export default {
  state,
  getters,
  actions,
  mutations
};
