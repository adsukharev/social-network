<template>
    <div>
        <button @click="addLike">Like</button>
        <button>DisLike</button>
        {{user.likes}}
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ProfileService from '@/services/Profile.js';
    import UserService from '@/services/Users.js';

    export default {
        name: "like-component",
        data() {
            return {
                user: {},
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'modalEditProfile', 'userProfile'
            ]),
        },
        created() {
            this.fetchUser();
        },
        methods: {
            async fetchUser() {
                this.user = await UserService.fetchOneUser('2', this.loggedUser.token);

            },
            async addLike() {
                await ProfileService.addLike('2', this.loggedUser.token);
                this.user = await UserService.fetchOneUser('2', this.loggedUser.token);

            },
        }
    }
</script>

<style scoped>

</style>