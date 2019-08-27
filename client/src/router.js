import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './components/loginPage/signup-component';
import Profile from './components/Profile/profile-component';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    // {
    //   path: '/forgotten',
    //   name: 'forgotten',
    //   component: Forgotten,
    // },
  ],
})
