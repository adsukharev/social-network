<template>
    <form @submit.prevent>

        <h3>Create an account</h3>
        <div class="form-group">
            <input type="email" v-model="loginData.email" class="form-control" id="emailInput" placeholder="Email">
        </div>
        <div class="form-group">
            <input type="text" v-model="loginData.login" class="form-control" id="loginInput" placeholder="Login">
        </div>
        <div class="form-group">
            <input type="text" v-model="loginData.user_name" class="form-control" id="nameInput"
                   placeholder="Your name">
        </div>
        <div class="form-group">
            <input type="password" v-model="loginData.password" class="form-control" id="passwordInput"
                   placeholder="Password">
        </div>
        <button type="submit" class="btn btn-success btn-block" @click="signUp">Sign Up</button>
        <button type="submit" class="btn facebook btn-block" @click="oauth">Continue with Facebook</button>


    </form>
</template>

<script>
    import RegistartionService from '@/services/Registration.js'

    export default {
        name: 'LoginComponent',
        data() {
            return {
                loginData: {
                    email: '',
                    login: '',
                    user_name: '',
                    password: '',
                }
            };
        },
        methods: {
            async signUp() {
                const res = await RegistartionService.signUp(this.loginData);
                this.$toasted.info(res);
            },
            async oauth() {
                //  todo: connect
            }
        },
    };
</script>

<style scoped>
    .facebook {
        color: white;
        background: rgb(63, 88, 146);
    }
</style>

