import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './components/loginPage/signup-component';
import Profile from './components/Profile/profile-component';
import Rating from './components/Rating/rating-component';
import Search from './components/Search/search-component';
import Chat from './components/Chat/chat-component';
import ChatId from './components/Chat/chat-id-component';


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'signup',
            component: SignUp,
        },
        {
            path: '/profile/:id',
            name: 'profile',
            component: Profile,
        },
        {
            path: '/rating',
            name: 'rating',
            component: Rating,
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
        },
        {
            path: '/chat',
            name: 'chat',
            component: Chat,
        },
        {
            path: '/chat/:id',
            name: 'chatId',
            component: ChatId,
        },
    ],
})
