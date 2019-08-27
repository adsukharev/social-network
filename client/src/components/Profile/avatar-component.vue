<template>
  <div>
    <img :src="avatar">
    <form>
      <input id="avatarinput" type="file" ref="myFile" accept="image/png, image/jpeg" @change="getAvatar">
    </form>
  </div>
</template>

<script>
  import UserService from '@/services/Users.js';
  import {mapState, mapGetters, mapMutations} from 'vuex';

  export default {
    name: "avatar-component",
    props: {
      avatar: Array
    },
    data() {
      return {
        data: ''
      };
    },
    computed: {
      ...mapState([
        'loggedUser'
      ])
    },
    methods: {
      getAvatar() {
        this.data = new FormData();
        const file = this.$refs.myFile.file;
        this.data.append('avatar', file);
        this.sendPhoto()
      },
      async sendPhoto() {
        await UserService.updateUser(this.loggedUser.id, this.data ,this.loggedUser.token)
      }
    },
  }
</script>

<style scoped>

</style>
