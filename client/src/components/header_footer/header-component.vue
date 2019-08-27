<template>
  <nav class="navbar navbar-expand-lg bg-header">
    <a class="navbar-brand" href="#">Matcha</a>
    <header-logged v-if="checkLogged > 0"></header-logged>
    <header-not-logged v-else></header-not-logged>
  </nav>
</template>

<script>
  import HeaderLogged from './header-logged.vue'
  import HeaderNotLogged from '../loginPage/header-not-logged.vue'
  import { mapGetters } from 'vuex';

  export default {
    name: "HeaderComponent",
    components: {
      HeaderLogged,
      HeaderNotLogged
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters([
        'checkLogged'
      ])
    },
  }
</script>

<style scoped>
  .bg-header {
    background-color: rgb(64, 89, 147);
  }

  a {
    color: white;
    font-weight: bold;
  }
</style>
