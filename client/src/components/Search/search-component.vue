<template>
    <div>
        <div class="row">
            <div class="col">
                <h6 class="headers_profile">Recommendation</h6>
                <div class="d-inline-block" v-for="user in usersRecommended">
                    <avatar-component  :user="user"></avatar-component>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">
                <search-modal-component @searchedUsers="searchDetailed"></search-modal-component>
            </div>
            <div class="col">
                <select class="form-control" v-model="filterSelect">
                    <option selected>Filter results</option>
                    <option>age</option>
                    <option>name</option>
                    <option>rating</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="d-inline-block" v-for="user in usersDetailed">
                    <avatar-component :user="user"></avatar-component>
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
                filterSelect: 'Filter results'
            };
        },
        computed: {
            ...mapState([
                'loggedUser'
            ]),
        },
        watch: {
            filterSelect: function (newFilter) {
                if (newFilter === 'age') {
                    this.usersDetailed.sort(this.compareAge)
                } else if (newFilter === 'name') {
                    this.usersDetailed.sort(this.compareName)
                } else if (newFilter === 'rating') {
                    this.usersDetailed.sort(this.compareLikes)
                }
            }
        },
        created() {
            this.searchRecommend();
        },
        methods: {
            async searchRecommend() {
                this.usersRecommended = await UserService.searchRecommend(this.loggedUser.token);
            },
            async searchDetailed(dataForSearch) {
                const users = await UserService.searchDetailed(dataForSearch, this.loggedUser.token);
                this.usersDetailed = users.data
            },
            compareAge(a, b) {
                if (a.age < b.age) {
                    return -1;
                }
                if (a.age > b.age) {
                    return 1;
                }
                return 0;
            },
            compareName(a, b) {
                if (a.user_name < b.user_name) {
                    return -1;
                }
                if (a.user_name > b.user_name) {
                    return 1;
                }
                return 0;
            },
            compareLikes(a, b) {
                if (a.sumlikes < b.sumlikes) {
                    return -1;
                }
                if (a.sumlikes > b.sumlikes) {
                    return 1;
                }
                return 0;
            }
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
