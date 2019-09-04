<template>
    <form @submit.prevent>

        <h3>Create an account</h3>
        <div class="form-group">
            <input type="email" v-model="loginData.email" class="form-control" id="emailInput" placeholder="Email"
                   maxlength="30">
        </div>
        <div class="form-group">
            <input type="text" v-model="loginData.login" class="form-control" id="loginInput" placeholder="Login"
                   maxlength="15">
        </div>
        <div class="form-group">
            <input type="text" v-model="loginData.user_name" class="form-control" id="nameInput"
                   placeholder="Your name" maxlength="15">
        </div>
        <div class="form-group">
            <input type="password" v-model="loginData.password" class="form-control" id="passwordInput"
                   placeholder="Password" maxlength="15">
        </div>

        <div class="row">

            <div class="col-sm-6">
                <facebook-login class="button"
                                appId="532470077295016"
                                @login="onLogin"
                                @logout="onLogout"
                                @sdk-loaded="sdkLoaded">
                    version="3.1"
                    >
                </facebook-login>
            </div>
            <div class="col-sm-4 offset-sm-2">
                <button type="submit" class="btn btn-success btn-block" @click="signUp()">Sign Up</button>
            </div>


        </div>


    </form>
</template>

<script>
    import RegistrationService from '@/services/Registration.js'
    import facebookLogin from 'facebook-login-vuejs';
    import {mapMutations} from 'vuex';
    import axios from 'axios';


    export default {
        name: 'LoginComponent',
        components: {
            facebookLogin
        },
        data() {
            return {
                loginData: {
                    email: '',
                    login: '',
                    user_name: '',
                    password: '',
                },
                fbData: {
                    name: '',
                    login: '',
                    email: '',
                    social_id: '',
                },
                fbLogin: {
                    login: '',
                    id: '',
                    token: '',
                },
                fb: undefined,
            };
        },
        methods: {
            ...mapMutations([
                'loginUser'
            ]),
            async signUp() {
                if (!this.checkForm()) {
                    return;
                }
                const res = await RegistrationService.signUp(this.loginData);
                this.$toasted.info(res);
            },
            checkForm() {
                if (this.loginData.user_name.length < 2 || this.loginData.user_name.length > 15) {
                    this.$toasted.error("name should between 3-15 characters long")
                    return false
                }
                if (this.loginData.login.length < 2 || this.loginData.login.length > 15) {
                    this.$toasted.error("login should between 3-15 characters long")
                    return false
                }
                if (this.loginData.email.length < 2 || this.loginData.email.length > 50) {
                    this.$toasted.error("email should between 5-30 characters long")
                    return false
                }
                if (this.loginData.email) {
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(this.loginData.email))
                        return false
                }
                if (this.loginData.password.length < 3 || this.loginData.password.length > 15) {
                    this.$toasted.error("password should between 3-15 characters long")
                    return false
                }
                return true

            },
            async fbOauth() {
                const jwt = await RegistrationService.oauth(this.fbData);
                this.sendLogin(jwt)
            },
            getUserData() {
                this.FB.api('/me', 'GET', {fields: 'id,name,email'},
                    async (userInformation) => {
                        this.fbData.social_id = userInformation.id;
                        this.fbData.email = userInformation.email;
                        this.fbData.name = userInformation.name;
                        this.fbData.login = userInformation.name;
                        this.fbOauth()
                    }
                )
            },
            sdkLoaded(payload) {
                this.isConnected = payload.isConnected;
                this.FB = payload.FB;
                if (this.isConnected) this.getUserData()
            },
            onLogin() {
                this.isConnected = true;
                this.getUserData()
            },
            onLogout() {
                this.isConnected = false;
            },
            startSession(userData) {
                this.fbLogin.token = userData['access_token'];
                this.fbLogin.id = userData['user_id'];
                this.fbLogin.login = this.loginData.login;
                this.loginUser(this.fbLogin);
            },
            async changePath(path) {
                if (window.location.pathname !== path) {
                    await this.$router.push(path)
                }
            },
            async sendLogin(res) {
                if (res.message === "ok") {
                    this.startSession(res);
                    this.$socket.emit('connect_logged_user', this.fbLogin.id);
                    this.changePath('/profile/' + this.fbLogin.id)
                } else {
                    this.$toasted.error(res.message);
                }
            },
        },
    }
    ;
</script>

<style scoped>
</style>

