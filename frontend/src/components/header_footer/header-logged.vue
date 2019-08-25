<template>

  <div class="navbar-expand navbar-dark">
    <div class="navbar-nav ">
      <a class="nav-item nav-link" href="/profile">Profile</a>
      <a class="nav-item nav-link" href="/search">Search</a>
      <a class="nav-item nav-link" href="/rating">Rating</a>
      <a class="nav-item nav-link" @click.prevent="logoutUser" href="/logout">Log out</a>
    </div>
  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "HeaderLogged",
    methods: {
      ...mapMutations([
        'logoutUser'
      ])
    },
  }
</script>

<style>

</style>
