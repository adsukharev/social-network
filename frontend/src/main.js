
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
// import Vuex from 'vuex'
// Vue.use(Vuex);
import store from './stores/store'
import App from './App';
import router from './router/router';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;
Vue.use(Toasted, {position: 'bottom-right', duration : 5000});


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
