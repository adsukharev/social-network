<template>
    <div>
        <h6 class="headers_profile">All Photos</h6>
        <div class="image_container">
            <img v-for="photo in photos" :src="photo" style="width:128px;height:150px;">
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "avatar-component",
        props: {
            photos: Array
        },
        data() {
            return {
            };
        },
        computed: {
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
