<template>
  <div>

    <div class="d-flex justify-content-center">
      <h4>Password retrieval</h4>
    </div>

    <div class="d-flex justify-content-center">
      <form class="form-inline" @submit.prevent>
        <input type="email" v-model="email" class="form-control" id="emailInput" placeholder="Email">
        <button class="btn btn-secondary btn-sm" type="submit" @click="forgottenFalse()">Back</button>
        <button class="btn btn-success btn-sm" type="submit" @click="changePassword()">Next</button>
      </form>
    </div>

  </div>

</template>

<script>
  import RegistartionService from '@/services/Registration.js'
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "forgotten-component",
    data() {
      return {
        email: '',
      }
    },
    methods: {
      ...mapMutations([
        'forgottenFalse'
      ]),
      async changePassword() {
        const res = await RegistartionService.forgotPassword(this.email);
        this.forgottenFalse();
        this.$toasted.info(res);
      },
    },
  }
</script>

<style scoped>

  H4 {
    padding-top: 2em;
  }

  button {
    margin-left: 1em;
  }
</style>
