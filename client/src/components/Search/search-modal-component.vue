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
                if (!this.checkForm())
                    return;
                this.showModalProfile = false;
                this.$emit('searchedUsers', this.userForm)

            },
            setUserForm(newUserForm) {
                this.userForm = newUserForm;
            },
            checkForm() {
                if (this.userForm.age[0] < 15 || this.userForm.age[1] > 150) {
                    this.$toasted.error("age should between 15-150 years old")
                    return false
                }
                if (this.userForm.sumLikes[0] < 0 || this.userForm.sumLikes[1] > 10000) {
                    this.$toasted.error("likes should be < 10 000");
                    return false
                }
                return true;
            },

        }
    }
</script>

<style scoped>

</style>
