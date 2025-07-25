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
        // async fetchJokes() {
        //     try {
        //         const res = await axios.get('https://official-joke-api.appspot.com/jokes/random/100');
        //         this.jokes = res.data;
        //     } catch (error) {
        //         console.error('Failed to fetch jokes:', error);
        //     }
        // },
        async fetchJokes() {
            try {
                const res = await fetch('https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json');
                const data = await res.json();

                const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
                this.jokes = [...saved, ...data];
            } catch (error) {
                console.error('Failed to load jokes:', error);
            }
        },
        setPage(page, router = null) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                if (router) {
                    router.replace({ query: { page: String(page) } });
                }
            }
        },
        addCustomJoke(jokeData) {
            const validIds = this.jokes.map(j => parseInt(j.id, 10)).filter(id => !isNaN(id));
            const nextId = validIds.length > 0 ? Math.max(...validIds) + 1 : 1;

            const newJoke = {
                id: nextId,
                type: jokeData.type || 'general',
                setup: jokeData.setup,
                punchline: jokeData.punchline,
                isCustom: true,
            };

            this.jokes = [newJoke, ...this.jokes];
            this.currentPage = 1;

            // Save to localStorage
            const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
            localStorage.setItem('customJokes', JSON.stringify([newJoke, ...saved]));
        },
        removeCustomJoke(id) {
            this.jokes = this.jokes.filter(joke => joke.id !== id);

            const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
            const updated = saved.filter(joke => joke.id !== id);
            localStorage.setItem('customJokes', JSON.stringify(updated));
        }




    },
});
