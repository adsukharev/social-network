<template>

    <b-modal v-model="modalEditProfile" title="Edit Profile" :no-close-on-esc='false' :no-close-on-backdrop='false'>
        <change-profile-form-component @newUserForm="setUserForm"></change-profile-form-component>
        {{userForm}}
        <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
            <button @click="editProfile()">
                Ok
            </button>
            <button @click="modalEditProfileChangeState()">
                Cancel
            </button>
        </template>
    </b-modal>

</template>

<script>
    import UserService from '../../services/Users.js';
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
                const dataForSend = this.createFormData();
                await UserService.updateUser(this.loggedUser.id, dataForSend, this.loggedUser.token);
                this.modalEditProfileChangeState();
                this.$emit('userProfileDataSend')

            },
            setUserForm(newUserForm) {
                this.userForm = newUserForm;
            },
            createFormData() {
                let dataForSend = new FormData();
                dataForSend.append('age', this.userForm.avatar);
                dataForSend.append('age', this.userForm.user_name);
                dataForSend.append('age', this.userForm.password);
                dataForSend.append('age', this.userForm.age);
                dataForSend.append('age', this.userForm.preferences);
                dataForSend.append('age', this.userForm.tags);
                dataForSend.append('age', this.userForm.bio);
                dataForSend.append('age', this.userForm.notification);
                return dataForSend
            },
        }
    }
</script>

<style scoped>

</style>
