<template>

    <div class="image_container">
        <router-link :to="{ name: 'profile', params: { id: user.user_id }}">
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
                data: '',
                photoMain: '',
            };
        },
        computed: {
            ...mapState([
                'loggedUser', 'modalEditProfile', 'userProfile',
            ]),
            info: function () {
                return this.user.user_name + ', ' + this.user.age
            },
        },
        methods: {
            async addLike() {
                if (!this.checkLike())
                    return;
                await ProfileService.addLike(this.user.user_id, this.loggedUser.token);
                this.user.sumlikes += 1;
                this.user.likes.push(this.loggedUser.login);
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
