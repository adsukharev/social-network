<template>
    <div id="app">
        <header>
            <header-component></header-component>
        </header>
        <main id="page-container">
            <div class="row pt-3">
                <div class="col-3"></div>
                <div class="col-6 inside_main">
                    <router-view v-if="loggedUserExist"/>
                    <forgotten-component v-else-if="forgottenPass"></forgotten-component>
                    <login-component v-else></login-component>
                </div>
                <div class="col-3"></div>
            </div>
        </main>
        <footer id="footer">
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
            ForgottenComponent,
        },
        data() {
            return {
                checkLogged: false,
            };
        },
        computed: {
            ...mapState([
                'forgottenPass', 'loggedUser',
            ]),
            ...mapGetters([
                'loggedUserExist',
            ]),
        },
        sockets: {
            connect: function () {
                console.log('socket connected');
            },
            notification: function (message) {
                this.$toasted.info(message);
            },
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

    #page-container {
        position: relative;
        min-height: 100vh;
        padding-bottom: 1em;
    }

</style>

