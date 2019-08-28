<template>
    <div>
        <div class="image_container">
            <img :src="mainPhoto" style="width:128px;height:150px;">
        </div>

        <form @submit.prevent class="">
            <input id="avatarinput" class="btn-sm" type="file" ref="myFile" accept="image/png, image/jpeg"
                   @change="getAvatar">
            <button class="btn btn-success btn-block" @click="addPhoto">Add photo</button>
        </form>
    </div>
</template>

<script>
    import UserService from '../../services/Users.js';
    import {mapState, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "avatar-component",
        props: {
            avatar: Array
        },
        data() {
            return {
                data: '',
                mainPhoto: ''
            };
        },
        computed: {
            ...mapState([
                'loggedUser',
            ]),
        },
        watch: {
            avatar: function (photos) {
                this.mainPhoto = photos[0];
            },
        },
        methods: {
            getAvatar() {
                this.data = new FormData();
                const file = this.$refs.myFile.files[0];
                this.data.append('avatar', file);
            },
            async addPhoto() {
                if (this.avatar.length <= 5) {
                    await UserService.updateUser(this.loggedUser.id, this.data, this.loggedUser.token);
                    this.$refs.myFile.value = '';
                    this.$emit('addPhoto')
                }
                else {
                    this.$toasted.info("Should be not more than 5 pictures")
                }

            }
        },
    }
</script>

<style scoped>
    .image_container {
        width: auto;
        text-align: center;
        padding: 20px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
</style>
