<template>
  <div class="navbar-collapse justify-content-end">
    <h4>Change Password</h4>
    <form class="form-inline" @submit.prevent>
      <input type="email" v-model="email" class="form-control" id="emailInput" placeholder="Email">
      <button class="btn btn-primary" type="submit" @click="changePassword()">Change password</button>
    </form>
  </div>
</template>

<script>
  import RegistartionService from '@/services/Registration.js'

  export default {
    name: "forgotten-component",
    data() {
      return {
        email: '',
      }
    },
    methods: {
      async changePassword() {
        const res = await RegistartionService.forgotPassword(this.email);
        this.$toasted.info(res);
      },
    },
  }
</script>

<style scoped>

</style>
