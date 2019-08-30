<template>
    <div>
        <div class="row">
            <div class="col">
                <div class="image_container">
                    <img src="crown.png" id="crown">
                </div>
                <avatar-component v-for="user in users" :user="user" :rating="true"></avatar-component>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import UserService from '@/services/Users.js';
    import avatarComponent from '../Profile/avatar-component.vue';

    export default {
        name: 'Rating-component',
        components: {
            avatarComponent,
        },
        data() {
            return {
                users: []
            };
        },
        computed: {
            ...mapState([
                'loggedUser'
            ]),
        },
        created() {
            this.getRating();
        },
        methods: {
            async getRating() {
                this.users = await UserService.fetchRating(this.loggedUser.token);
                // console.log(users);
                // this.users = users;
            },
        }
    };
</script>

<style>
    .headers_profile {
        text-align: center;
    }

    .image_container {
        width: auto;
        text-align: center;
        padding: 1em;
    }

    #crown {
        width: 7em;
        height: 100%;
        object-fit: contain;
    }
</style>

