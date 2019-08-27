<template>
    <div id="app">
        <header>
            <header-component></header-component>
        </header>
        <main>
            <div class="row pt-3">
                <div class="col-3"></div>
                <div class="col-6 inside_main">
                    <router-view v-if="checkLogged"/>
                    <forgotten-component v-else-if="forgottenPass"></forgotten-component>
                    <login-component v-else></login-component>
                </div>
                <div class="col-3"></div>
            </div>
        </main>
        <footer>
            <footer-component></footer-component>
        </footer>
    </div>

</template>

<script>
    import HeaderComponent from './components/header_footer/header-component.vue';
    import FooterComponent from './components/header_footer/footer-component.vue';
    import LoginComponent from './components/loginPage/signup-component.vue';
    import ForgottenComponent from './components/loginPage/forgotten-component.vue';

    import {mapGetters, mapState} from 'vuex';

    export default {
        name: 'App',
        components: {
            HeaderComponent,
            FooterComponent,
            LoginComponent,
            ForgottenComponent
        },
        // data() {
        //   return {
        //     kek: window.location.pathname
        // };
        // },
        computed: {
            ...mapGetters([
                'checkLogged'
            ]),
            ...mapState([
                'forgottenPass'
            ]),
        },
    };
</script>

<style>
    main {
        background-color: rgb(237, 238, 240);
    }

    .inside_main {
        border-radius: 20px;
        background-color: white
    }
</style>

