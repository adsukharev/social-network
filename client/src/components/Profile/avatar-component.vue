<template>

    <div class="image_container">
        <img :src="mainPhoto" style="width:128px;height:150px;">
    </div>

</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "avatar-component",
        data() {
            return {
                data: '',
                mainPhoto: ''
            };
        },
        computed: {
            ...mapState([
                'userProfile'
            ]),
        },
        watch: {
            userProfile: function (userProfile) {
                this.mainPhoto = userProfile.avatar[0];
            },
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
