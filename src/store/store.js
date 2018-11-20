import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    userToken:null,
    username:null,
    userAuth:null,
    user_name:null
  },
  mutations:{
    setToken: (state,token)=> state.userToken = token,
    setUsername: (state,username)=> state.username = username,
    setAuth: (state,auth)=> state.userAuth = auth,
    setUser_name: (state,name)=> state.user_name = name,
    logOut: (state) => {
      Object.keys(state).forEach(e=>{
        state[e] = null;
      })
      localStorage.removeItem('accessData')
    },
  },
});
