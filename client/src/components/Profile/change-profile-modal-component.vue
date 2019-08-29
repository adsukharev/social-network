<template>

    <b-modal v-model="modalEditProfile" no-close-on-esc no-close-on-backdrop>
        <template slot="modal-header" slot-scope="{ close }">
            <h5>Edit Profile</h5>
        </template>
        <change-profile-form-component @newUserForm="setUserForm"></change-profile-form-component>
        {{userForm}}
        <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
            <button class="btn btn-danger " @click="modalEditProfileChangeState()">Cancel</button>
            <button class="btn btn-success " @click="editProfile()">Ok</button>
        </template>
    </b-modal>

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
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'userProfile', 'modalEditProfile'
            ]),
        },
        watch: {},
        methods: {
            ...mapMutations([
                'modalEditProfileChangeState', 'userProfileChange'
            ]),
            async editProfile() {
                this.checkForm();
                const dataForSend = this.createFormData();
                await UserService.updateUser(this.loggedUser.id, dataForSend, this.loggedUser.token);
                this.modalEditProfileChangeState();
                this.$toasted.success("Profile is changed");
                this.$emit('userProfileDataSend')

            },
            setUserForm(newUserForm) {
                this.userForm = newUserForm;
            },
            checkForm() {
                if (!this.userForm.bio) {
                    this.userForm.bio = ''
                }
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
                dataForSend.append('notification', this.userForm.notification);
                return dataForSend
            },
        }
    }
</script>

<style scoped>

</style>
