<template>
    <div>
        <h6 class="headers_profile">All Photos</h6>
        <div class="image_container">
            <div class="d-inline-block" v-for="(photo, index) in userProfile.avatar">
                <img :src="photo">
                <br>
                <button v-if="loggedUser.id === userProfile.user_id" class="btn btn-sm btn-secondary" @click="deleteImage(index + 1)">Delete</button>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ProfileService from '@/services/Profile.js';

    export default {
        name: "avatar-component",
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'userProfile', 'loggedUser'
            ]),
        },
        methods: {
            async deleteImage(i) {
                await ProfileService.deleteImage(i, this.loggedUser.token);
                this.$toasted.success("Picture is deleted");
                this.$emit('updateUser')

            },
        },

    }
</script>

<style scoped>
    .image_container {
        width: auto;
        text-align: center;
    }

    img {
        width: 100%;
        max-width: 120px;
        height: auto;
        margin: 1em;

    }
</style>
