<template>
    <div>
        <div class="row">
            <div class="col-4">
                <avatar-component :user="user" @addPhoto="getUser"></avatar-component>
                <button class="btn btn-block btn-secondary" @click="modalEditProfileChangeState">Edit profile</button>
                <change-profile-modal-component v-if="loggedUser.id === user.user_id"
                        @userProfileDataSend="getUser"></change-profile-modal-component>
            </div>
            <div class="col">
                <info-component></info-component>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <photos-component></photos-component>
            </div>
        </div>
        <div class="row" v-if="loggedUser.id === user.user_id">
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
    import changeProfileModalComponent from './change-profile-modal-component.vue'
    import likeComponent from '../tools/like-component.vue'

    export default {
        name: 'Profile',
        components: {
            infoComponent,
            avatarComponent,
            photosComponent,
            changeProfileModalComponent,
            likeComponent
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
            this.getUser();

        },
        methods: {
            ...mapMutations([
                'modalEditProfileChangeState', 'userProfileChange'
            ]),
            async getUser() {
                this.user = await UserService.fetchOneUser(this.loggedUser.id, this.loggedUser.token);
                this.userProfileChange(this.user);
            },
        }
    };
</script>

<style>
    .headers_profile {
        text-align: center;
    }
</style>

