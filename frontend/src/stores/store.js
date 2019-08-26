import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedUser: {},
    forgottenPass: false,
  },
  mutations: {
    loginUser (state, newUserData) {
      state.loggedUser = newUserData
    },
    logoutUser(state) {
      state.loggedUser = {}
    },
    forgottenTrue(state){
        state.forgottenPass = true;
    },
    forgottenFalse(state){
        state.forgottenPass = false;
    },
  },
  getters: {
    checkLogged: state => {
       return Object.keys(state.loggedUser).length
    }

  }
});

export default store;
