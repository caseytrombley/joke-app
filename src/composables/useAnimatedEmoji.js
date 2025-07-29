import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useAnimatedEmoji(frames = ['😄', '😊', '😆', '😂', '🤣', '😅'], speed = 300) {
    const emojiAnimation = ref(frames[0]);
    let frame = 0;
    let interval;

    onMounted(() => {
        interval = setInterval(() => {
            frame = (frame + 1) % frames.length;
            emojiAnimation.value = frames[frame];
        }, speed);
    });

    onBeforeUnmount(() => {
        clearInterval(interval);
    });

    return {
        emojiAnimation,
    };
}
