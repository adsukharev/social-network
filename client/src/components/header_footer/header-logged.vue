<template>

    <div class="navbar-expand navbar-dark">
        <div class="navbar-nav ">
            <router-link class="nav-item nav-link" :to="{ name: 'profile', params: { id: loggedUser.id }}">Profile
            </router-link>
            <router-link class="nav-item nav-link" to="/chat" exact @click.native="">Chat</router-link>
            <router-link class="nav-item nav-link" to="/search" exact @click.native="">Search</router-link>
            <router-link class="nav-item nav-link" to="/rating" exact @click.native="">Rating</router-link>
            <router-link class="nav-item nav-link" to="/" exact @click.native="logoutUser">Log out</router-link>
        </div>
    </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex';

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
        }
    }
</script>

<style>

</style>
