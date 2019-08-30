<template>
    <div>
        <div class="row">
            <div class="col">
                <h6 class="headers_profile">Recommendation</h6>
                <div class="d-inline-block">
                    <avatar-component v-for="user in usersRecommended" :user="user"></avatar-component>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">
                <search-modal-component></search-modal-component>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="d-inline-block">
                    <avatar-component v-for="user in usersDetailed" :user="user"></avatar-component>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import UserService from '@/services/Users.js';
    import avatarComponent from '../Profile/avatar-component.vue';
    import searchModalComponent from './search-modal-component.vue'


    export default {
        name: 'search-component',
        components: {
            avatarComponent,
            searchModalComponent
        },
        data() {
            return {
                usersRecommended: [],
                usersDetailed: [],
                dataForSearch: {},
            };
        },
        computed: {
            ...mapState([
                'loggedUser'
            ]),
        },
        created() {
            this.searchRecommend();
        },
        methods: {
            async searchRecommend() {
                this.usersRecommended = await UserService.searchRecommend(this.loggedUser.token);
            },
            async searchDetailed() {
                this.usersDetailed = await UserService.searchDetailed(this.dataForSearch, this.loggedUser.token);
            },
        }
    };
</script>

<style scoped>
    /*.image_container {*/
    /*    width: auto;*/
    /*    text-align: center;*/
    /*}*/

    /*img {*/
    /*    width: 100%;*/
    /*    max-width: 120px;*/
    /*    height: auto;*/
    /*    margin: 1em;*/

    /*}*/
</style>
