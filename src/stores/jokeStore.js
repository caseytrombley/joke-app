// store/jokeStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useJokeStore = defineStore('jokeStore', {
    state: () => ({
        jokes: [],
        currentPage: 1,
        jokesPerPage: 10,
    }),
    getters: {
        totalPages(state) {
            return Math.ceil(state.jokes.length / state.jokesPerPage);
        },
        paginatedJokes(state) {
            const start = (state.currentPage - 1) * state.jokesPerPage;
            return state.jokes.slice(start, start + state.jokesPerPage);
        },
    },
    actions: {
        async fetchJokes() {
            try {
                const res = await axios.get('https://official-joke-api.appspot.com/jokes/random/100');
                this.jokes = res.data;
            } catch (error) {
                console.error('Failed to fetch jokes:', error);
            }
        },
        setPage(page, router = null) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                if (router) {
                    router.replace({ query: { page: String(page) } });
                }
            }
        }
    },
});
