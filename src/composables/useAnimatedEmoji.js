import { ref } from 'vue';

export function useAnimatedEmoji(frames = ['😄', '😊', '😆', '😂', '🤣', '😅'], intervalMs = 300) {
    const emojiAnimation = ref(frames[0]);
    let frame = 0;
    let intervalId = null;

    function startEmojiAnim() {
        if (intervalId) return;
        intervalId = setInterval(() => {
            frame = (frame + 1) % frames.length;
            emojiAnimation.value = frames[frame];
        }, intervalMs);
    }

    function stopEmojiAnim() {
        clearInterval(intervalId);
        intervalId = null;
    }

    return {
        emojiAnimation,
        startEmojiAnim,
        stopEmojiAnim,
    };
}
