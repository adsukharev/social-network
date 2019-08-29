<template>
    <div>
        <button class="btn btn-success" @click="addLike">Like</button>
        <button class="btn btn-danger" @click="addDislike">Dislike</button>
        {{user.likes}}
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ProfileService from '@/services/Profile.js';

    export default {
        name: "like-component",
        props: {
          user_id: '',
        },
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
            // this.fetchUser();
        },
        methods: {
            // async fetchUser() {
            //     this.user = await UserService.fetchOneUser('2', this.loggedUser.token);
            //
            // },
            async addLike() {
                await ProfileService.addLike(this.user_id, this.loggedUser.token);

            },
            async addDislike() {
                await ProfileService.addDislike(this.user_id, this.loggedUser.token);

            },
        }
    }
</script>

<style scoped>

</style>