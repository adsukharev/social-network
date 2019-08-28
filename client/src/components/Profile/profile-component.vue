<template>
    <div>
        <div class="row">
            <div class="col-4">
                <avatar-component :avatar="user.avatar" @addPhoto="getUser"></avatar-component>
            </div>
            <div class="col">
                <info-component :user="user"></info-component>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <photos-component :photos="user.avatar"></photos-component>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <!--        <likes-info-component></likes-info-component>-->
            </div>
            <div class="col">
                <!--        <history-info-component></history-info-component>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import UserService from '@/services/Users.js';
    import infoComponent from './info-component.vue';
    import avatarComponent from './avatar-component.vue';
    import photosComponent from './photos-component.vue'

    export default {
        name: 'Profile',
        components: {
            infoComponent,
            avatarComponent,
            photosComponent
        },
        data() {
            return {
                user: {},
            };
        },
        computed: {
            ...mapState([
                'loggedUser',
            ]),
        },
        created() {
            this.getUser();

        },
        methods: {
            async getUser() {
                this.user = await UserService.fetchOneUser(this.loggedUser.id, this.loggedUser.token);
            },
        }
    };
</script>

<style>
    .headers_profile {
        text-align: center;
    }
</style>

