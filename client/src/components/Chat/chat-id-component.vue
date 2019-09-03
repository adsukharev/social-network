<template>
    <div>
        <div class="container messages">
            <div v-if="messages.length > 0">
                <div class="row" v-for="message in messages">
                    <div class="col">
                        {{message | filterMessage}}
                    </div>
                </div>
            </div>
            <h5 v-else>No message yet</h5>
        </div>
        <div class="container input_field">
            <div class="row">
                <div class="col-10">
                    <input class="btn-block" v-model="dataToSend.text">
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
        name: 'chat-id-component',
        data() {
            return {
                messages: [],
                dataToSend: {
                    text: '',
                    chat_id: this.$route.params.id,
                    author: '',
                    creation_date: '',
                    partner_id: '',
                }

            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'userProfile'
            ]),
        },
        filters: {
            filterMessage: function (value) {
                let date = new Date(value.creation_date).toLocaleTimeString();
                let message = `${value.author} ${date}: ${value.text}`;
                return message
            }
        },
        created() {
            this.getChat();
            this.$socket.emit('join', this.dataToSend.chat_id)
        },
        methods: {
            async getChat() {
                const data = await ChatService.fetchChat(this.dataToSend.chat_id, this.loggedUser.token);
                console.log(data);
                this.messages = data['messages'];
                this.dataToSend.partner_id = data['partner_id'];
            },
            async sendMessage() {
                if (!this.checkForm()) {
                    return ;
                }
                this.dataToSend.author = this.loggedUser.login;
                this.dataToSend.creation_date = new Date();
                this.$socket.emit('message', this.dataToSend);
                this.dataToSend.text = '';
            },
            checkForm() {
                const reg = /<script/;
                if (reg.test(this.dataToSend.text)) {
                   this.dataToSend.text = '';
                    this.$toasted.error("Don't fuck my ass");
                    return false
                }
                return true

            },
        },
        sockets: {
            receive_message: function (message) {
                this.messages.push(message);
            }
        },
    };
</script>

<style>
    .button_cust {
        margin-bottom: 3px;
    }
</style>

