<template>
    <div>
        {{chat}}
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ChatService from '@/services/Chat.js';


    export default {
        name: 'chat-component',
        data() {
            return {
                chat: []
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'userProfile'
            ]),
        },
        watch: {
            '$route.params.id': function (id) {
                this.getChat(id)
            }
        },
        created() {
            this.getChat(this.$route.params.id);
        },
        methods: {
            async getChat(id) {
                this.chat = await ChatService.fetchChat(id, this.loggedUser.token);
            },
        }
    };
</script>

<style>
    .table_rows {
        text-align:center;
    }
</style>

