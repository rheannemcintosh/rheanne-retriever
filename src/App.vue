<script setup>
import AppLayout from './components/AppLayout.vue';
import ChatWindow from './components/ChatWindow.vue';
import ChatInput from './components/ChatInput.vue';
import { useChat } from './composables/useChat.js';

const { messages, loading, error, sendMessage } = useChat();
</script>

<template>
    <AppLayout>
        <ChatWindow :messages="messages" />
        <p v-if="error" class="chat-error">{{ error }}</p>
        <ChatInput :disabled="loading" @submit="sendMessage" />
    </AppLayout>
</template>

<style scoped>
    .chat-error {
        color: #c0392b;
        font-size: 14px;
        padding: 8px 0;
    }
</style>
