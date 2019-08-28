<template>

  <div class="navbar-expand navbar-dark">
    <div class="navbar-nav ">
      <router-link class="nav-item nav-link" to="/profile" exact @click.native="">Profile</router-link>
      <router-link class="nav-item nav-link" to="/search" exact @click.native="">Search</router-link>
      <router-link class="nav-item nav-link" to="/rating" exact @click.native="">Rating</router-link>
      <router-link class="nav-item nav-link" to="/" exact @click.native="logoutUser">Log out</router-link>
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
      ]),
      logout() {
        // this.$router.push('/');
        this.logoutUser()
      },
    }
  }
</script>

<style>

</style>
