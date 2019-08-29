<template>
    <div>
        <h4>People who like you:</h4>
<!--        <avatar-component></avatar-component>-->
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
                this.userProfile.likes.forEach( async (id) => {
                    const user = await UserService.fetchOneUser(id, this.loggedUser.token);
                    this.usersLiked.push(user);
                });

            },
        },
    }
</script>

<style scoped>

</style>