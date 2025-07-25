import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddJokeView from '@/views/AddJokeView.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/add-joke', component: AddJokeView },
    ],
})