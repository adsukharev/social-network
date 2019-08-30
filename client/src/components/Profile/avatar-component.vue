<template>

    <div class="image_container">
        <router-link :to="{ name: 'profile', params: { id: user.user_id }}">
            <img :src="user.avatar[0]" style="width:128px;height:150px;" alt="avatar">
        </router-link>
        <div v-if="loggedUser.id !== user.user_id || rating">
            <p>{{info}}</p>
            <p>total likes: {{user.sumlikes}}</p>
        </div>
        <div v-if="loggedUser.id !== user.user_id" id="buttonsLikes">
            <button class="btn btn-success" @click="addLike">Like</button>
            <button class="btn btn-danger" @click="addDislike">Dislike</button>
        </div>
    </div>


</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ProfileService from '@/services/Profile.js';

    export default {
        name: "avatar-component",
        props: {
            user: Object,
            rating: false,
        },
        data() {
            return {
                data: '',
                photoMain: '',
            };
        },
        // watch: {
        //   user: function (newUser) {
        //       this.photoMain = newUser.avatar[0]
        //   }
        // },
        computed: {
            ...mapState([
                'loggedUser', 'modalEditProfile', 'userProfile',
            ]),
            info: function () {
                return this.user.user_name + ', ' + this.user.age
            },
        },
        methods: {
            async addLike() {
                await ProfileService.addLike(this.user.user_id, this.loggedUser.token);

            },
            async addDislike() {
                await ProfileService.addDislike(this.user.user_id, this.loggedUser.token);

            },
        },
    }
</script>

<style scoped>
    .image_container {
        width: auto;
        text-align: center;
        padding: 1em;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    #buttonsLikes {
        margin-top: 1em;
    }
</style>
