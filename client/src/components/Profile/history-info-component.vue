<template>
    <div>
        <h6 class="headers_profile">People who visited you:</h6>
        <avatar-component v-for="user in usersHistory" :user="user"></avatar-component>

    </div>
</template>

<script>
    import UserService from '@/services/Users.js';
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import avatarComponent from './avatar-component.vue';

    export default {
        name: "history-info-component",
        components: {
            avatarComponent,
        },
        data() {
            return {
                usersHistory: []
            }
        },
        computed: {
            ...mapState([
                'userProfile', 'loggedUser'
            ]),
        },
        created() {
          this.fetchUsersHistory();
        },
        methods: {
             fetchUsersHistory() {
                 if (this.userProfile.history === null) {
                     return ;
                 }
                this.userProfile.history.forEach( async (login) => {
                    const user = await UserService.fetchOneUserByLogin(login, this.loggedUser.token);
                    this.usersHistory.push(user);
                });

            },
        },
    }
</script>

<style scoped>

</style>