import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    userToken:null,
    username:null
  },
  mutations:{
    setToken: (state,token)=> state.userToken = token,
    setUsername: (state,username)=> state.username = username,
    logOut: (state) => {
      state.username = null;
      state.userToken = null;
      localStorage.removeItem('accessData')
    },
  },
});
