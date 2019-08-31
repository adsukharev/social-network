<template>
    <div>
        <hr>
        <div class="row">
            <div class="col">
                {{userProfile.user_name}}
            </div>
            <div class="col">
                {{userProfile.online}}
                <button v-if="loggedUser.id !== userProfile.user_id"
                        class="btn btn-sm btn-outline-dark blockBtn"
                        @click="blockUser(userProfile.user_id)">Block
                </button>

            </div>
        </div>

        <div class="row">
            <div class="col">
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <p>City</p>
                <p>Age</p>
                <p>Sex</p>
                <p>Preferences</p>
                <p>Tags</p>
                <p>Biography</p>

            </div>
            <div class="col">
                <p>{{userProfile.city}}</p>
                <p>{{userProfile.age}}</p>
                <p>{{userProfile.sex}}</p>
                <p>{{userProfile.preferences}}</p>
                <p>{{String(userProfile.tags)}}</p>
                <p>{{userProfile.bio}}</p>

            </div>
        </div>

        <div class="row">
            <div class="col">

            </div>
            <div class="col">

            </div>
        </div>
    </div>
</template>

<script>
    import UserService from '@/services/Users.js';
    import {mapState, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "avatar-component",
        computed: {
            ...mapState([
                'userProfile', 'loggedUser'
            ]),
        },
        methods: {
            async blockUser(id) {
                await UserService.fakeUser(id, this.loggedUser.token);
            }
        }

    }
</script>

<style scoped>
    .headers_info {
        text-align: end;
    }

    .blockBtn {
        margin-left: 1em;
    }

</style>
