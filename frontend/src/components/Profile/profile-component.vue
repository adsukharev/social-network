<template>
  <div>
    <div class="row">
      <div class="col">
<!--        <avatar-component></avatar-component>-->
      </div>
      <div class="col">
        {{user}}
<!--        <main-info-component></main-info-component>-->
      </div>
    </div>
    <div class="row">
      <div class="col">
<!--        <photos-component></photos-component>-->
      </div>
    </div>
    <div class="row">
      <div class="col">
<!--        <likes-info-component></likes-info-component>-->
      </div>
      <div class="col">
<!--        <history-info-component></history-info-component>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex';
  import UserService from '@/services/Users.js'

  export default {
    name: 'Profile',
    data() {
      return {
        user: {},
      };
    },
    computed: {
      ...mapState([
        'loggedUser'
      ])
    },
    created() {
      this.getUser();

    },
    methods: {
      async getUser() {
        this.user = await UserService.fetchOneUser(this.loggedUser.id, this.loggedUser.token);
      },
    }
  };
</script>

