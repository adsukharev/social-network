<template>
  <div class="navbar-collapse justify-content-end">
    <form class="form-inline" @submit.prevent>
      <input class="form-control mr-sm-2" v-model="loginData.login" type="text" placeholder="Login">
      <input class="form-control mr-sm-2" v-model="loginData.password" type="password" placeholder="Password">
      <button class="btn btn-primary" type="submit" @click="sendLogin()">Log in</button>
      <a href="#">Forgotten account?</a>
    </form>
  </div>
</template>

<script>
  import RegistartionService from '@/services/Registration.js'
  import UsersService from '@/services/Users.js'
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: "HeaderNotLogged",
    data() {
      return {
        loginData: {
          login: 'test1',
          password: '123Wertyq',
          token: ''
        }

      };
    },
    methods: {
      ...mapMutations([
        'loginUser'
      ]),
      async sendLogin() {
        const res = await RegistartionService.signIn(this.loginData);
        if (res.message === "ok") {
          this.$toasted.success(res.message);
          this.loginData.token = res['access_token'];
          this.loginUser(this.loginData)
        } else {
          this.$toasted.error(res.message);

        }
      }
    },
  }
</script>

<style scoped>
  a {
    padding-left: 2em;
    color: white;
  }
</style>


