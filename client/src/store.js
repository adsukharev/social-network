import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.sessionStorage, // or window.sessionStorage or localForage
    reducer: (state) => ({loggedUser: state.loggedUser}),
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
});

export default new Vuex.Store({
    state: {
        forgottenPass: false,
        loggedUser: {},
        // modalEditProfile: false,
        userProfile: {},
    },
    mutations: {
        forgottenTrue(state) {
            state.forgottenPass = true;
        },
        forgottenFalse(state) {
            state.forgottenPass = false;
        },
        loginUser(state, user) {
            state.loggedUser = user
        },
        logoutUser(state) {
            state.loggedUser = {}
        },
        userProfileChange(state, newData) {
            state.userProfile = newData
        },
        // modalEditProfileChangeState(state) {
        //     if (state.modalEditProfile)
        //         state.modalEditProfile = false;
        //     else
        //         state.modalEditProfile = true;
        // },
    },
    getters: {
        loggedUserExist(state) {
            return (Object.keys(state.loggedUser).length)
        },
    },
    plugins: [vuexPersist.plugin]
});
