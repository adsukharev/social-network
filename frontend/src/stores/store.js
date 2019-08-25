import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedUser: {}
  },
  mutations: {
    loginUser (state, newUserData) {
      state.loggedUser = newUserData
    },
    logoutUser(state) {
      state.loggedUser = {}
    }
  },
  getters: {
    checkLogged: state => {
       return Object.keys(state.loggedUser).length
    }

  }
});

export default store;
