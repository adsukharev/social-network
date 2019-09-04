<template>
    <div>

        <table v-if="Object.keys(chats).length > 0" class="table table-hover">
            <thead>
            <tr class="table_rows">
                <th>Chat Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="chat in chats" class="table_rows">
                <router-link :to="{ name: 'chatId', params: { id: chat.chat_id }}">
                    <td>{{chat.chat_name}}</td>
                </router-link>
            </tr>
            </tbody>
        </table>
        <div v-else>
            <h4>No chats yet</h4>
        </div>
    </div>


</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ChatService from '@/services/Chat.js';


    export default {
        name: 'chat-component',
        data() {
            return {
                chats: []
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'userProfile'
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
    .table_rows {
        text-align: center;
    }
</style>

