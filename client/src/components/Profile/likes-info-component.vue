<template>
    <div>
        <h6 class="headers_profile">People who like you:</h6>
        <avatar-component v-for="user in usersLiked" :user="user"></avatar-component>

    </div>
</template>

<script>
    import UserService from '@/services/Users.js';
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import avatarComponent from './avatar-component.vue';

    export default {
        name: "likes-info-component",
        components: {
            avatarComponent,
        },
        data() {
            return {
                usersLiked: []
            }
        },
        computed: {
            ...mapState([
                'userProfile', 'loggedUser'
            ]),
        },
        created() {
          this.fetchUsersLiked();
        },
        methods: {
             fetchUsersLiked() {
                 if (this.userProfile.likes === null) {
                     return ;
                 }
                this.userProfile.likes.forEach( async (login) => {
                    const user = await UserService.fetchOneUserByLogin(login, this.loggedUser.token);
                    this.usersLiked.push(user);
                });

            },
        },
    }
</script>

<style scoped>

</style>