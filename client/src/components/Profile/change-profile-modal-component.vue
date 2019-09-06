<template>

    <div>
        <button class="btn btn-block btn-secondary" @click="showModalProfile = !showModalProfile">Edit profile</button>
        <b-modal v-model="showModalProfile" no-close-on-esc no-close-on-backdrop>
            <template slot="modal-header" slot-scope="{ close }">
                <h5>Edit Profile</h5>
            </template>
            <change-profile-form-component @newUserForm="setUserForm"></change-profile-form-component>
            <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
                <button class="btn btn-danger " @click="showModalProfile = !showModalProfile">Cancel</button>
                <button class="btn btn-success " @click="editProfile()">Ok</button>
            </template>
        </b-modal>

    </div>


</template>

<script>
    import UserService from '../../services/Users.js';
    import ProfileService from '../../services/Profile.js';
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import changeProfileFormComponent from './change-profile-form-component.vue'
    import {BModal} from 'bootstrap-vue'

    export default {
        name: "change-profile-modal-component",
        components: {
            changeProfileFormComponent,
            BModal
        },
        data() {
            return {
                userForm: {},
                showModalProfile: false,
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'userProfile'
            ]),
        },
        watch: {},
        methods: {
            async editProfile() {
                if (!this.checkForm())
                    return ;
                const dataForSend = this.createFormData();
                await UserService.updateUser(this.loggedUser.id, dataForSend, this.loggedUser.token);
                this.showModalProfile = false;
                this.$toasted.success("Profile is changed");
                this.$emit('updateUser')

            },
            setUserForm(newUserForm) {
                this.userForm = newUserForm;
            },
            checkForm() {
                const reg = /<script/;
                if (!this.userForm.bio) {
                    this.userForm.bio = ''
                }
                if (reg.test(this.userForm.bio)){
                    this.userForm.bio = '';
                    this.$toasted.error("Don't fuck my ass");
                }
                if (reg.test(this.userForm.tags)){
                    this.userForm.tags = '';
                    this.$toasted.error("Don't fuck my ass");
                }
                if (this.userForm.user_name.length < 2 || this.userForm.user_name.length > 15) {
                    this.$toasted.error("name should between 3-15 characters long")
                    return false
                }
                if (this.userForm.city.length < 2 || this.userForm.city.length > 35) {
                    this.$toasted.error("city should between 3-35 characters long")
                    return false
                }
                if (this.userForm.password) {
                    if (this.userForm.password.length < 2 || this.userForm.password.length > 15) {
                        this.$toasted.error("password should between 3-15 characters long")
                        return false
                    }
                }
                if (this.userForm.age < 15 || this.userForm.age > 150) {
                    this.$toasted.error("age should between 15-150 years old")
                    return false
                }
                return true

            },
            createFormData() {
                let dataForSend = new FormData();
                if (this.userForm.avatar)
                    dataForSend.append('avatar', this.userForm.avatar);
                if (this.userForm.user_name)
                    dataForSend.append('user_name', this.userForm.user_name);
                if (this.userForm.sex)
                    dataForSend.append('sex', this.userForm.sex);
                if (this.userForm.password)
                    dataForSend.append('password', this.userForm.password);
                if (this.userForm.age)
                    dataForSend.append('age', this.userForm.age);
                if (this.userForm.city)
                    dataForSend.append('city', this.userForm.city);
                if (this.userForm.preferences)
                    dataForSend.append('preferences', this.userForm.preferences);
                if (this.userForm.tags)
                    dataForSend.append('tags', JSON.stringify(this.userForm.tags));
                dataForSend.append('bio', this.userForm.bio);
                return dataForSend
            },
        }
    }
</script>

<style scoped>

</style>
