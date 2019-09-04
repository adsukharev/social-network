<template>
    <div>
        <div class="row">
            <div class="col-lg-4 ">
                <avatar-component :user="userProfile" @addPhoto="getUser"></avatar-component>
                <change-profile-modal-component v-if="loggedUser.id === userProfile.user_id"
                                                @updateUser="getUser()"></change-profile-modal-component>
            </div>
            <div class="col-lg-8">
                <info-component></info-component>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <hr>
                <photos-component @updateUser="getUser()"></photos-component>
            </div>
        </div>
        <hr>
        <div class="row" v-if="loggedUser.id === userProfile.user_id">
            <div class="col-sm-6">
                <likes-info-component></likes-info-component>
            </div>
            <div class="col-sm-6">
                <history-info-component></history-info-component>
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
    import changeProfileModalComponent from './change-profile-modal-component.vue'
    import likesInfoComponent from './likes-info-component.vue'
    import historyInfoComponent from './history-info-component.vue'

    export default {
        name: 'Profile-component',
        components: {
            infoComponent,
            avatarComponent,
            photosComponent,
            changeProfileModalComponent,
            likesInfoComponent,
            historyInfoComponent
        },
        data() {
            return {
                routeId: ''
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'modalEditProfile', 'userProfile'
            ]),
        },
        watch: {
            '$route.params.id': function (id) {
                // this.routeId = id;
                this.getUser(id);
            }
        },
        created() {
            this.getUser(this.$route.params.id);
            // this.routeId = this.$route.params.id;
        },
        methods: {
            ...mapMutations([
                'userProfileChange'
            ]),
            async getUser(id) {
                const user = await UserService.fetchOneUser(this.$route.params.id, this.loggedUser.token);
                this.userProfileChange(user);
            },
        }
    };
</script>

<style>
    .headers_profile {
        text-align: center;
    }
</style>

