<template>

    <div>
        <button class="btn btn-block btn-primary" @click="showModalProfile = !showModalProfile">Detailed Search</button>
        <b-modal v-model="showModalProfile" no-close-on-esc no-close-on-backdrop>
            <template slot="modal-header" slot-scope="{ close }">
                <h5>Detailed Search</h5>
            </template>
            <search-form-component @newUserForm="setUserForm"></search-form-component>
            <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
                <button class="btn btn-danger " @click="showModalProfile = !showModalProfile">Cancel</button>
                <button class="btn btn-success " @click="startSearch()">Search</button>
            </template>
        </b-modal>
    </div>

</template>

<script>
    import UserService from '../../services/Users.js';
    import ProfileService from '../../services/Profile.js';
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import searchFormComponent from './search-form-component.vue'
    import {BModal} from 'bootstrap-vue'

    export default {
        name: "search-modal-component",
        components: {
            searchFormComponent,
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
                'loggedUser'
            ]),
        },
        watch: {},
        methods: {
            async startSearch() {
                this.checkForm();
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
                if (!this.userForm.bio) {
                    this.userForm.bio = ''
                }
            },

        }
    }
</script>

<style scoped>

</style>
