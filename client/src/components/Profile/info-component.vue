<template>
    <div>

        <div class="row">
            <div class="col">
                {{userProfile.user_name}}
            </div>
            <div class="col">
                <p>{{userProfile.online}}</p>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <hr>
                <h6 class="headers_profile">Main Information</h6>
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
                <p>{{userProfile.tags}}</p>
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
                'userProfile'
            ]),
        },

    }
</script>

<style scoped>
    .headers_info {
        text-align: end;
    }
</style>
