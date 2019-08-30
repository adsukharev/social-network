<template>
    <div>
        <form @submit.prevent class="">

            <div class="form-inline">
                <div class="form-group ">
                    <label for="ageFromInput" class="label">Age:</label>
                    <input type="number" class="form-control" id="ageFromInput" v-model="userForm.age"
                           placeholder="from">
                </div>

                <div class="form-group ">
                    <label for="ageTillInput">-</label>
                    <input type="number" class="form-control" id="ageTillInput" v-model="userForm.age" placeholder="to">
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
                    <select id="tagsInput" class="form-control" v-model="selectedTag">
                        <option v-for="tag in allTags">{{tag}}</option>
                    </select>
                </div>
                <div class="form-group col">
                    <label for="tagsChosenInput">Chosen tags:</label>
                    <!--                      <button class="btn btn-sm btn-outline-dark">Clear tags</button>-->
                    <input type="image" src="deleteIcon" id="icondelete" @click="deleteTags()"/>
                    <input id="tagsChosenInput" class="form-control-plaintext" readonly v-model="userForm.tags">
                </div>
            </div>


            <div class="form-row">
                <div class="form-group  col">
                    <label for="locationInput">Location:</label>
                    <input type="checkbox" id="locationInput" v-model="userForm.location">
                </div>
                <div class="form-group col">

                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ProfileService from '../../services/Profile.js';

    export default {
        name: "search-form-component",
        data() {
            return {
                data: '',
                userForm: {
                    age: Number,
                    sex: '',
                    locatiom: false,
                    preferences: '',
                    tags: [],
                },
                allTags: [],
                selectedTag: ''
            };
        },
        computed: {
            ...mapState([
                'loggedUser',
            ]),
        },
        watch: {
            userForm: {
                handler: function (newValue) {
                    this.$emit('newUserForm', newValue);
                },
                deep: true
            },
            selectedTag: function (newValue) {
                if (!this.userForm.tags.includes(newValue)) {
                    this.userForm.tags.push(newValue);
                    this.selectedTag = '';
                }
            },
        },
        created() {
            this.getTags();
        },
        methods: {
            async getTags() {
                this.allTags = await ProfileService.fetchTags(this.loggedUser.token);
            },
            deleteTags() {
                this.userForm.tags = [];
            }
        },
    }
</script>

<style scoped>
    #locationInput {
        margin-left: 1em;
    }

    #icondelete {
        padding: 0;
        margin-left: 1em;
        width: 20px;
        height: auto;
    }
    .label {
        margin-right: 1em;
    }
</style>
