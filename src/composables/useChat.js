import { ref } from 'vue';

export function useChat() {
    const messages = ref([]);
    const loading = ref(false);
    const error = ref(null);

    async function sendMessage(text) {
        error.value = null;
        loading.value = true;
        messages.value.push({ role: 'user', text });

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();

            if (!res.ok) {
                error.value = data.error ?? 'Something went wrong. Please try again.';
                return;
            }

            messages.value.push({ role: 'agent', text: data.reply });
        } catch {
            error.value = 'Could not reach the server. Please try again.';
        } finally {
            loading.value = false;
        }
    }

    return { messages, loading, error, sendMessage };
}
