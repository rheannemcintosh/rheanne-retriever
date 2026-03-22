import { ref } from 'vue';

export function useChat() {
    const messages = ref([]);

    async function sendMessage(text) {
        messages.value.push({ role: 'user', text });

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
        });

        const data = await res.json();
        messages.value.push({ role: 'agent', text: data.reply });
    }

    return { messages, sendMessage };
}
