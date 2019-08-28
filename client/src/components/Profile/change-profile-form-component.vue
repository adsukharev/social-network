<template>
    <div>
        <form @submit.prevent class="">
            <input type="text" v-model="userForm.user_name">
            <input type="number" v-model="userForm.age">
            <input type="text" v-model="userForm.preferences">
            <input type="text" v-model="userForm.tags">
            <input type="text" v-model="userForm.bio">
            <input type="checkbox" v-model="userForm.notification">

            <input id="avatarinput" class="btn-sm" type="file" ref="myFile" accept="image/png, image/jpeg"
                   @change="getAvatar">

        </form>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';

    // modalEditProfileChangeState
    export default {
        name: "change-profile-form-component",
        data() {
            return {
                data: '',
                userForm: {
                    avatar: '',
                    user_name: '',
                    password: '',
                    age: Number,
                    preferences: [],
                    tags: [],
                    bio: '',
                    notification: false
                }
            };
        },
        computed: {
            ...mapState([
                'userProfile',
            ]),
        },
        watch: {
            userForm: {
                handler: function (newValue) {
                    this.$emit('newUserForm', newValue);
                },
                deep: true
            }
        },
        methods: {
            getAvatar() {
                this.userForm.avatar = this.$refs.myFile.files[0];
            },
        },
    }
</script>

<style scoped>

</style>
