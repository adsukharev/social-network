<template>
  <div>
    {{user}}
  </div>
</template>

<script>
  import UserService from '@/services/Users.js';

  export default {
    name: "avatar-component",
    props: {
      user: Object
    },

  }
</script>

<style scoped>

</style>
