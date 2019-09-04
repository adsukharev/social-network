<template>
    <div>
        <hr>
        <div class="row">
            <div class="col">
                {{userProfile.user_name}}
            </div>
            <div class="col">
                {{userProfile.online}}
                <router-link :to="{ name: 'profile', params: { id: loggedUser.id }}">
                    <button v-if="loggedUser.id !== userProfile.user_id"
                            class="btn btn-sm btn-outline-dark blockBtn"
                            @click="blockUser(userProfile.user_id)">Fake
                    </button>
                </router-link>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <hr>
            </div>
        </div>

        <div class="row">
            <div class="col-4">
                <p>City</p>
                <p>Age</p>
                <p>Sex</p>
                <p>Preferences</p>
                <p>Tags</p>
                <p>Biography</p>

            </div>
            <div class="col-8">
                <p>{{userProfile.city | filterEmpty}} </p>
                <p>{{userProfile.age | filterEmpty}}</p>
                <p>{{userProfile.sex | filterEmpty}}</p>
                <p>{{userProfile.preferences | filterEmpty}}</p>
                <p>{{(userProfile.tags) | filterEmpty}}</p>
                <p>{{userProfile.bio | filterEmpty}}</p>

            </div>
        </div>


    </div>
</template>

<script>
    import UserService from '@/services/Users.js';
    import {mapState, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "info-component",
        computed: {
            ...mapState([
                'userProfile', 'loggedUser'
            ]),
        },
        methods: {
            async blockUser(id) {
                await UserService.fakeUser(id, this.loggedUser.token);
                this.$socket.emit('manage_notification', {
                    type: 'fake',
                    author: this.loggedUser.login,
                    partner_id: id,
                });
                this.$toasted.info('User is blocked')

            }
        },
        filters: {
            filterEmpty: function (value) {
                if (!value) {
                    return '-';
                }
                return String(value);
            }
        },

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
