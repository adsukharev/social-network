<template>
  <div id="app">
    <header>
      <header-component></header-component>
    </header>
    <main>
      <router-view v-if="forgottenPass"/>
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
  import LoginComponent from './components/signup-component.vue';
  import { mapGetters, mapState } from 'vuex';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      FooterComponent,
      LoginComponent
    },
    // data() {
    //   return {
    //     forgottenPass: false,
    //   }
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

