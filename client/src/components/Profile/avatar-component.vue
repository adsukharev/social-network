<template>

    <div class="image_container">
        <img :src="mainPhoto" style="width:128px;height:150px;">
        <div id="buttonsLikes" v-if="loggedUser.id !== user.user_id">
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
        },
        data() {
            return {
                data: '',
                mainPhoto: '',
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'modalEditProfile', 'userProfile'

            ]),
        },
        watch: {
            user: function (newUser) {
                this.mainPhoto = newUser.avatar[0];
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
