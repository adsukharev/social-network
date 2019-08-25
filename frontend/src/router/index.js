import Vue from 'vue';
import Router from 'vue-router';
import Profile from '@/components/profile-component';
import Forgotten from '@/components/forgotten-component';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/forgotten',
      name: 'Forgotten',
      component: Forgotten,
    },
  ],
  mode: 'history',
});
