<template>
  <nav class="navbar navbar-expand-lg bg-header">
    <a class="navbar-brand" style="font-weight: bold" href="#">Matcha</a>
    <header-logged v-if="user"></header-logged>
    <header-not-logged v-else></header-not-logged>
  </nav>
</template>

<script>
  import HeaderLogged  from './header-logged.vue'
  import HeaderNotLogged  from './header-not-logged.vue'
  export default {
    name: "HeaderComponent",
    components: {
      HeaderLogged,
      HeaderNotLogged
    },
    data() {
      return {
        user: ''
      }
    }
  }
</script>

<style>
  .bg-header {
    background-color: rgb(64, 89, 147);
  }
  a {
    color: white;
  }

</style>
