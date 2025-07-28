import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useAddJokeLink() {
    const route = useRoute();

    const addJokeLink = computed(() => ({
        path: '/',
        query: {
            ...route.query,
            add: 'true',
        },
    }));

    return { addJokeLink };
}
