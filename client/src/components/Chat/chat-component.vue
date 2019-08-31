<template>
    <div>
        <div v-if="Object.keys(chats).length > 0">
            <div class="row" v-for="chat in chats">
                <div class="col">
                    {{chat}}
                </div>
            </div>
        </div>
        <div v-else>
            <h4>No chats yet</h4>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import UserService from '@/services/Users.js';
    import ChatService from '@/services/Chat.js';

    // import infoComponent from './info-component.vue';
    // import avatarComponent from './avatar-component.vue';
    // import photosComponent from './photos-component.vue'
    // import changeProfileModalComponent from './change-profile-modal-component.vue'
    // import likesInfoComponent from './likes-info-component.vue'
    // import historyInfoComponent from './history-info-component.vue'

    export default {
        name: 'chat-component',
        // components: {
        //     infoComponent,
        //     avatarComponent,
        //     photosComponent,
        //     changeProfileModalComponent,
        //     likesInfoComponent,
        //     historyInfoComponent
        // },
        data() {
            return {
                chats: []
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'modalEditProfile', 'userProfile'
            ]),
        },
        created() {
            this.getChats();
        },
        methods: {
            async getChats() {
                this.chats = await ChatService.fetchChats(this.loggedUser.token);
            },
        }
    };
</script>

<style>

</style>

