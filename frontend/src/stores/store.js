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
    forgottenChange(state){
      if (state.forgottenPass)
        state.forgottenPass = false;
      else
        state.forgottenPass = true;
    },
  },
  getters: {
    checkLogged: state => {
       return Object.keys(state.loggedUser).length
    }

  }
});

export default store;
