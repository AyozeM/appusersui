import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    userToken:null,
    username:null,
    userAuth:null
  },
  mutations:{
    setToken: (state,token)=> state.userToken = token,
    setUsername: (state,username)=> state.username = username,
    setAuth: (state,auth)=> state.userAuth = auth,
    logOut: (state) => {
      state.username = null;
      state.userToken = null;
      state.userAuth = null;
      localStorage.removeItem('accessData')
    },
  },
});
