import { defineStore } from 'pinia';

export const useJokeStore = defineStore('jokeStore', {
    state: () => ({
        jokes: [],
        currentPage: 1,
        jokesPerPage: 10,
        ratings: {}
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
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
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

            const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
            localStorage.setItem('customJokes', JSON.stringify([newJoke, ...saved]));
        },

        removeCustomJoke(id) {
            this.jokes = this.jokes.filter(joke => joke.id !== id);

            const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
            const updated = saved.filter(joke => joke.id !== id);
            localStorage.setItem('customJokes', JSON.stringify(updated));
        },

        editCustomJoke(id, newSetup, newPunchline) {
            const joke = this.jokes.find(j => j.id === id);
            if (joke && joke.isCustom) {
                joke.setup = newSetup;
                joke.punchline = newPunchline;

                const saved = JSON.parse(localStorage.getItem('customJokes') || '[]');
                const updated = saved.map(j =>
                    j.id === id ? { ...j, setup: newSetup, punchline: newPunchline } : j
                );
                localStorage.setItem('customJokes', JSON.stringify(updated));
            }
        },

        rateJoke(jokeId, rating) {
            this.ratings[jokeId] = rating;
            localStorage.setItem('jokeRatings', JSON.stringify(this.ratings));
        }
    }
});
