import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';
import VueSocketIO from 'vue-socket.io'


let HOST_URL = process.env.VUE_APP_HOST_URL;
// let HOST_URL = "http://192.168.99.100:5000";
// let HOST_URL = "http://localhost:5000";
Vue.use(new VueSocketIO({
    debug: true,
    connection: `${HOST_URL}/api/socket`,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}));
Vue.config.productionTip = false;
Vue.use(Toasted, {position: 'bottom-right', duration : 5000});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
