<script setup>
    import { ref } from 'vue';

    defineProps({
        disabled: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['submit']);
    const input = ref('');

    function handleSubmit() {
        const text = input.value.trim();
        if (!text) return;
        emit('submit', text);
        input.value = '';
    }
</script>

<template>
    <form class="chat-input" @submit.prevent="handleSubmit">
        <input
            v-model="input"
            class="chat-input__field"
            type="text"
            placeholder="Ask a question..."
            :disabled="disabled"
        />
        <button
            class="chat-input__button"
            type="submit"
            :disabled="disabled || !input.trim()"
        >
            Send
        </button>
    </form>
</template>

<style scoped>
    .chat-input {
        display: flex;
        gap: 8px;
        padding-top: 16px;
        border-top: 1px solid var(--border);
    }

    .chat-input__field {
        flex: 1;
        padding: 10px 14px;
        border: 1px solid var(--border);
        border-radius: 8px;
        font: inherit;
        font-size: 16px;
        color: var(--text-h);
        background: var(--bg);
        outline: none;
        transition: border-color 0.2s;
    }

    .chat-input__field:focus {
        border-color: var(--accent);
    }

    .chat-input__button {
        padding: 10px 20px;
        background: var(--accent);
        color: #fff;
        border: none;
        border-radius: 8px;
        font: inherit;
        font-size: 16px;
        cursor: pointer;
        transition: opacity 0.2s;
    }

    .chat-input__button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
</style>
