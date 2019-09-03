<template>
    <div>
        <form @submit.prevent class="">

            <div class="form-group row">
                <label for="ageFromInput" class="col-3 col-form-label">Age:</label>
                <div class="col">
                    <input type="number" class="form-control" id="ageFromInput" v-model="userForm.age[0]"
                           placeholder="from" min="15" max="150">
                </div>
                <div class="col">
                    <input type="number" class="form-control" id="ageTillInput" v-model="userForm.age[1]"
                           placeholder="to" min="15" max="150">
                </div>
            </div>

            <div class="form-group row">
                <label for="likesFromInput" class="col-3 col-form-label">Total Likes:</label>
                <div class="col">
                    <input type="number" class="form-control" id="likesFromInput" v-model="userForm.sumLikes[0]"
                           placeholder="from" min="0" max="100000">
                </div>
                <div class="col">
                    <input type="number" class="form-control" id="likesTillInput" v-model="userForm.sumLikes[1]"
                           placeholder="to" min="0" max="100000">
                </div>
            </div>

            <div class="form-group row">
                <label for="sexInput" class="col-3 col-form-label">Sex:</label>
                <div class="col">
                    <select class="form-control" id="sexInput" v-model="userForm.sex">
                        <option>male</option>
                        <option>female</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="preferencesInput" class="col-3 col-form-label">Preferences:</label>
                <div class="col">
                    <select id="preferencesInput" class="form-control" v-model="userForm.preferences">
                        <option>bisexual</option>
                        <option>getero</option>
                        <option>gomo</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="tagsInput" class="col-3 col-form-label">Tag's list:</label>
                <div class="col">
                    <select id="tagsInput" class="form-control" v-model="selectedTag">
                        <option v-for="tag in allTags">{{tag}}</option>
                    </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="tagsChosenInput" class="col-3 col-form-label">Chosen tags:</label>
                <div class="col-7">
                    <input id="tagsChosenInput" class="form-control-plaintext" readonly v-model="userForm.tags">
                </div>
                <div class="col-2">
                    <input type="image" src="deleteIcon" id="icondelete" @click="deleteTags()"/>
                </div>
            </div>


            <div class="form-check" style="padding-left: 0">
                <label for="locationInput" class="form-check-label">Close to you:</label>
                <input type="checkbox" id="locationInput" v-model="userForm.location">
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
                userForm: {
                    age: [],
                    sumLikes: [],
                    sex: '',
                    location: false,
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

    #icondelete {
        padding: 0;
        margin-left: 1em;
        width: 20px;
        height: auto;
    }

    #locationInput {
        margin-left: 2rem;
    }
</style>
