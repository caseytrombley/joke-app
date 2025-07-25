// store/jokeStore.js
import { defineStore } from 'pinia';

export const useJokeStore = defineStore('jokeStore', {
    state: () => ({
        jokes: [],
        currentPage: 1,
        jokesPerPage: 10,
        ratings: {} // { [jokeId]: number }
    }),

    getters: {
        totalPages(state) {
            return Math.ceil(state.jokes.length / state.jokesPerPage);
        },

        paginatedJokes(state) {
            const start = (state.currentPage - 1) * state.jokesPerPage;
            return state.jokes.slice(start, start + state.jokesPerPage);
        },

        jokeTypes(state) {
            const types = new Set(state.jokes.map(j => j.type));
            return Array.from(types).sort();
        }
    },

    actions: {
        async fetchJokes() {
            try {
                const res = await fetch('https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json');
                const data = await res.json();

                // Add unique ID to jokes that don’t already have one
                const jokesWithIds = data.map((joke, index) => ({
                    ...joke,
                    id: joke.id ?? `static-${index}`
                }));

                const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
                const ratings = JSON.parse(localStorage.getItem('jokeRatings') || '{}');

                this.jokes = [...saved, ...jokesWithIds];
                this.ratings = ratings;
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
        },

        rateJoke(jokeId, rating) {
            this.ratings[jokeId] = rating;
            localStorage.setItem('jokeRatings', JSON.stringify(this.ratings));
        }
    }
});
