<template>
    <nav class="navbar navbar-expand-lg bg-header">
        <a class="navbar-brand" href="#">Matcha</a>
        <header-logged v-if="loggedUserExist"></header-logged>
        <header-not-logged v-else></header-not-logged>
    </nav>
</template>

<script>
    import HeaderLogged from './header-logged.vue'
    import HeaderNotLogged from '../loginPage/header-not-logged.vue'
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "HeaderComponent",
        components: {
            HeaderLogged,
            HeaderNotLogged
        },
        data() {
            return {
                checkLogged: false,
            };
        },
        computed: {
            ...mapGetters([
                'loggedUserExist',
            ]),
        },
    }
</script>

<style scoped>
    .bg-header {
        background-color: rgb(64, 89, 147);
    }

    a {
        color: white;
        font-weight: bold;
    }
</style>
