<template>
    <div>
        <form @submit.prevent class="">

            <div class="form-row">
                <div class="form-group col">
                    <label for="userNameInput">User Name:</label>
                    <input type="text" class="form-control" id="userNameInput" v-model="userForm.user_name"
                           maxlength="15">
                </div>

                <div class="form-group col">
                    <label for="passwordInput">Password:</label>
                    <input type="password" class="form-control" id="passwordInput" v-model="userForm.password"
                           maxlength="15">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <label for="cityInput">City:</label>
                    <input type="text" class="form-control" id="cityInput" v-model="userForm.city">
                </div>
                <div class="form-group col">
                    <label for="ageInput">Age:</label>
                    <input type="number" class="form-control" id="ageInput" v-model="userForm.age" min="15" max="150">
                </div>

            </div>

            <div class="form-row">
                <div class="form-group col">
                    <label for="sexInput">Sex:</label>
                    <select class="form-control" id="sexInput" v-model="userForm.sex">
                        <option>male</option>
                        <option>female</option>
                    </select>
                </div>
                <div class="form-group col">
                    <label for="preferencesInput">Preferences:</label>
                    <select id="preferencesInput" class="form-control" v-model="userForm.preferences">
                        <option>bisexual</option>
                        <option>getero</option>
                        <option>gomo</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col">
                    <label for="tagsInput">Tag's list:</label>
                    <select id="tagsInput" class="form-control" v-model="selected">
                        <option v-for="tag in allTags">{{tag}}</option>
                    </select>
                </div>
                <div class="form-group col">
                    <label for="tagsChosenInput">Your tags:</label>
                    <textarea id="tagsChosenInput" v-model="tagsString" maxlength="250"></textarea>
                </div>
            </div>

            <div class="form-group">
                <label for="bioInput">Biography:</label>
                <textarea id="bioInput" class="form-control" v-model="userForm.bio" maxlength="250"></textarea>
            </div>

            <div class="form-group">
                <input id="avatarinput" class="form-control-file" type="file" ref="myFile"
                       accept="image/png, image/jpeg"
                       @change="getAvatar">
            </div>

        </form>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ProfileService from '../../services/Profile.js';

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
                    sex: '',
                    city: '',
                    latitude: '',
                    longitude: '',
                    preferences: '',
                    tags: [],
                    bio: '',
                },
                tagsString: '',
                selected: '',
                allTags: [],
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'userProfile',
            ]),
        },
        watch: {
            userForm: {
                handler: function (newValue) {
                    this.$emit('newUserForm', newValue);
                },
                deep: true
            },
            selected: function (newValue) {
                if (!this.userForm.tags) {
                    this.userForm.tags = [];
                    this.userForm.tags[0] = newValue;
                    this.tagsString = newValue
                } else if (!this.userForm.tags.includes(newValue)) {
                    if (this.tagsString.slice(-1) === ',') {
                        this.tagsString += newValue
                    } else if (this.userForm.tags[0] === '') {
                        this.tagsString = newValue
                    } else {
                        this.tagsString += ',' + newValue
                    }
                }
            },
            tagsString: function (newValue) {
                this.userForm.tags = newValue.trim().split(',')
            }
        },
        created() {
            this.userForm = Object.assign({}, this.userProfile);
            this.userForm.password = '';
            if (this.userForm.tags)
                this.tagsString = String(this.userForm.tags);
            this.getTags();
        },
        methods: {
            async getTags() {
                this.allTags = await ProfileService.fetchTags(this.loggedUser.token);
            },
            getAvatar() {
                this.userForm.avatar = this.$refs.myFile.files[0];
            },
        },
    }
</script>

<style scoped>

</style>
