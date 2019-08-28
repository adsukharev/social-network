import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;
Vue.use(Toasted, {position: 'bottom-right', duration : 5000});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
