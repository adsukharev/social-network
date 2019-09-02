<template>

    <div class="navbar-expand navbar-dark">
        <div class="navbar-nav ">
            <router-link class="nav-item nav-link" :to="{ name: 'profile', params: { id: loggedUser.id }}">Profile
            </router-link>
            <router-link class="nav-item nav-link" to="/chat">Chat</router-link>
            <router-link class="nav-item nav-link" to="/search">Search</router-link>
            <router-link class="nav-item nav-link" to="/rating">Rating</router-link>
            <router-link class="nav-item nav-link" to="/" exact @click.native="logout">Log out</router-link>
        </div>
    </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import RegistrationService from '@/services/Registration.js'

    export default {
        name: "HeaderLogged",
        computed: {
            ...mapState([
                'userProfile', 'loggedUser'
            ]),
        },
        methods: {
            ...mapMutations([
                'logoutUser'
            ]),
            async logout() {
                await RegistrationService.logout(this.loggedUser.token);
                this.logoutUser();
                this.$socket.emit('disconnect');
            }
        }
    }
</script>

<style>

</style>
