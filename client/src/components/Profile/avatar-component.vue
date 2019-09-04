<template>

    <div class="image_container">
        <router-link
                v-if="user.avatar"
                :to="{ name: 'profile', params: { id: user.user_id }}"
                exact @click.native="manageHistory"
        >
            <img :src="user.avatar[0]" style="width:128px;height:150px;" alt="avatar">
        </router-link>
        <div v-if="loggedUser.id !== user.user_id || rating">
            <p>{{info}}</p>
            <p>total likes: {{user.sumlikes}}</p>
        </div>
        <div v-if="loggedUser.id !== user.user_id" id="buttonsLikes">
            <button class="btn btn-success" @click="addLike">Like</button>
            <button class="btn btn-danger" @click="addDislike">Dislike</button>
        </div>
    </div>


</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    import ProfileService from '@/services/Profile.js';

    export default {
        name: "avatar-component",
        props: {
            user: Object,
            rating: false,
        },
        data() {
            return {
                notification: {}
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'modalEditProfile', 'userProfile',
            ]),
            info: function () {
                if (this.user.age)
                    return this.user.user_name + ', ' + this.user.age
                else if (!this.user.age)
                    return this.user.user_name;
                else
                    return '-'

            },
        },
        created() {
            this.notification = {
                type: 'like',
                author: this.loggedUser.login,
                partner_id: this.user.user_id,
            }
        },
        methods: {
            async addLike() {
                if (!this.checkLike())
                    return;
                await ProfileService.addLike(this.user.user_id, this.loggedUser.token);
                this.user.sumlikes += 1;
                this.user.likes.push(this.loggedUser.login);
                this.sendNotification('like');
                this.$toasted.success("Like")
            },
            checkLike() {
                if (this.user.likes === null) {
                    this.user.likes = [];
                    return true;
                }
                if (this.user.likes.includes(this.loggedUser.login)) {
                    this.$toasted.info("You've already liked this person");
                    return false
                }
                return true;
            },
            async addDislike() {
                if (!this.checkDislike())
                    return;
                await ProfileService.addDislike(this.user.user_id, this.loggedUser.token);
                this.user.sumlikes -= 1;
                this.deleteEl();
                this.sendNotification('dislike');
                this.$toasted.error("Dislike")
            },
            deleteEl() {
                for (let i = 0; i < this.user.likes.length; i++) {
                    if (this.user.likes[i] === this.loggedUser.login) {
                        this.user.likes.splice(i, 1);
                    }
                }
            },
            checkDislike() {
                if (this.user.likes === null) {
                    this.$toasted.info("You can dislike after like");
                    return false
                }
                if (!this.user.likes.includes(this.loggedUser.login)) {
                    this.$toasted.info("You can dislike after like");
                    return false;
                }
                return true;
            },
            async manageHistory() {
                if (this.user.user_id !== this.loggedUser.id) {
                    await ProfileService.addHistory(this.user.user_id, this.loggedUser.token);
                    this.sendNotification('history')
                }
            },
            sendNotification(type) {
                this.notification.type = type;
                this.$socket.emit('manage_notification', this.notification);
            }
        },
    }
</script>

<style scoped>
    .image_container {
        width: auto;
        text-align: center;
        padding: 1em;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    #buttonsLikes {
        margin-top: 1em;
    }
</style>
