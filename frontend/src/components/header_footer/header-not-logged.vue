<template>
  <div class="navbar-collapse justify-content-end">
    <form class="form-inline" @submit.prevent>
      <input class="form-control mr-sm-2" v-model="loginData.login" type="text" placeholder="Login">
      <input class="form-control mr-sm-2" v-model="loginData.password" type="password" placeholder="Password">
      <button class="btn btn-primary" type="submit" @click="sendLogin()">Log in</button>
    </form>
  </div>
</template>

<script>
  import RegistartionService from '@/services/Registration.js'
  import UsersService from '@/services/Users.js'

  export default {
    name: "HeaderNotLogged",
    data() {
      return {
        loginData: {
          login: 'test1',
          password: '123Wertyq',
        }

      };
    },
    methods: {
      async sendLogin() {
        const res = await RegistartionService.signIn(this.loginData);
        if (res.message === "ok") {
          this.$toasted.success(res.message);

        } else {
          this.$toasted.error(res.message);

        }
      }
    },
  }
</script>


