<template>
    <div>
        <div class="container messages">
            <div class="row" v-if="chat.length > 0">
                <div class="col">
                    {{chat}}
                </div>
            </div>
            <h5 v-else>No message yet</h5>
        </div>
        <div class="container input_field">
            <div class="row">
                <div class="col-10">
                    <input class="btn-block" v-model="message">
                </div>
                <div class="col">
                    <button class="btn btn-outline-success btn-sm button_cust" @click="sendMessage">Send</button>
                </div>
            </div>
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
                chat: [],
                message: '',

            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'userProfile'
            ]),
        },
        created() {
            this.getChat();
        },
        methods: {
            async getChat() {
                this.chat = await ChatService.fetchChat(this.$route.params.id, this.loggedUser.token);
            },
            async sendMessage() {
                this.$socket.emit('emit_method', this.message)
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            customEmit: function (data) {
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
            }
        },
    };
</script>

<style>
    .button_cust {
        margin-bottom: 3px;
    }
</style>

