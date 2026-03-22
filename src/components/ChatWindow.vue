<script setup>
    defineProps({
        messages: {
            type: Array,
            default: () => [],
        },
    });
</script>

<template>
    <div class="chat-window">
        <p v-if="messages.length === 0" class="chat-window__empty">
            Ask me anything about Rheanne's experience.
        </p>
        <div v-else class="chat-window__messages">
            <div
                v-for="(msg, index) in messages"
                :key="index"
                class="chat-message"
                :class="`chat-message--${msg.role}`"
            >
                <p class="chat-message__text">{{ msg.text }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .chat-window {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-bottom: 16px;
    }

    .chat-window__empty {
        color: var(--text);
        text-align: center;
        margin-top: 48px;
    }

    .chat-window__messages {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .chat-message {
        max-width: 80%;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 16px;
        line-height: 1.5;
    }

    .chat-message--user {
        align-self: flex-end;
        background: var(--accent);
        color: #fff;
        border-bottom-right-radius: 4px;
    }

    .chat-message--agent {
        align-self: flex-start;
        background: var(--border);
        color: var(--text-h);
        border-bottom-left-radius: 4px;
    }
</style>
