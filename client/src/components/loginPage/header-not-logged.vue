<template>
    <div class="navbar-collapse justify-content-end">
        <form class="form-inline" @submit.prevent>
            <input
                    class="form-control mr-sm-2"
                    v-model="loginData.login"
                    type="text" placeholder="Login"
                    minlength="3"
                    maxlength="15"
            >
            <input
                    class="form-control mr-sm-2"
                    v-model="loginData.password"
                    type="password"
                    placeholder="Password"
                    minlength="3"
                    maxlength="15"
            >
            <button class="btn btn-primary" type="submit" @click="sendLogin()">Log in</button>
            <router-link to="/" exact @click.native="forgottenTrue">Forgotten password?</router-link>
        </form>
    </div>
</template>

<script>
    import RegistrationService from '@/services/Registration.js'
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "HeaderNotLogged",
        data() {
            return {
                loginData: {
                    login: 'test1',
                    password: '123Wertyq',
                    latitude: '',
                    longitude: ''
                },
                user: {
                    login: 'test1',
                    token: '',
                }

            };
        },
        methods: {
            ...mapMutations([
                'loginUser', 'forgottenTrue', 'forgottenFalse'
            ]),
            async askLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.getLocation);
                }
            },
            getLocation(position) {
                this.loginData.latitude = position.coords.latitude;
                this.loginData.longitude = position.coords.longitude;
            },
            startSession(userData) {
                this.user.token = userData['access_token'];
                this.user.id = userData['user_id'];
                this.user.login = this.loginData.login;
                this.loginUser(this.user);
            },
            async changePath(path) {
                if (window.location.pathname !== path) {
                    await this.$router.push(path)
                }
            },
            async sendLogin() {
                const res = await RegistrationService.signIn(this.loginData);
                if (res.message === "ok") {
                    this.forgottenFalse();
                    await this.askLocation();
                    this.startSession(res);
                    this.$socket.emit('connect_logged_user', this.user.id);
                    // this.$socket.emit('connect');
                    this.changePath('/profile/' + this.user.id)
                } else {
                    this.$toasted.error(res.message);
                }
            },
        },
    }
</script>

<style scoped>
    a {
        padding-left: 2em;
        color: white;
    }
</style>


