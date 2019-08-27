<template>
    <div>

        <div class="row">
            <div class="col">
                {{user.user_name}}
            </div>
            <div class="col">
                <p>{{user.online}}</p>
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
                <p>Age</p>
                <p>Sex</p>
                <p>Preferences</p>
                <p>Biography</p>
            </div>
            <div class="col">
                <p>{{user.age}}</p>
                <p>{{user.sex}}</p>
                <p>{{user.preferences}}</p>
                <p>{{user.bio}}</p>
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

    export default {
        name: "avatar-component",
        props: {
            user: Object
        },

    }
</script>

<style scoped>
    .headers_info {
        text-align: end;
    }
</style>
