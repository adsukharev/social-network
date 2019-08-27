<template>
  <div id="app">
    <header>
      <header-component></header-component>
    </header>
    <main>
      <router-view v-if="checkLogged"/>
      <forgotten-component v-else-if="forgottenPass"></forgotten-component>
      <login-component v-else></login-component>
    </main>
    <footer>
      <footer-component></footer-component>
    </footer>
  </div>

</template>

<script>
  import HeaderComponent from './components/header_footer/header-component.vue';
  import FooterComponent from './components/header_footer/footer-component.vue';
  import LoginComponent from './components/loginPage/signup-component.vue';
  import ForgottenComponent from './components/loginPage/forgotten-component.vue';

  import {mapGetters, mapState} from 'vuex';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      FooterComponent,
      LoginComponent,
      ForgottenComponent
    },
    // data() {
    //   return {
    //     kek: window.location.pathname
    // };
    // },
    computed: {
      ...mapGetters([
        'checkLogged'
      ]),
      ...mapState([
        'forgottenPass'
      ]),
    },
  };
</script>

<style>

</style>

