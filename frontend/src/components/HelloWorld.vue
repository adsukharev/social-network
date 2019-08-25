<template>
  <div class="hello">
    <h1></h1>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: '',
      };
    },
    computed: {
      ...mapGetters([
        'checkLogged'
      ])
    },
    methods: {},

  };
</script>

