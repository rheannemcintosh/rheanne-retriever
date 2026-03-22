<script setup>
import AppLayout from './components/AppLayout.vue';
import ChatWindow from './components/ChatWindow.vue';
import ChatInput from './components/ChatInput.vue';
import { useChat } from './composables/useChat.js';

const { messages, sendMessage } = useChat();
</script>

<template>
    <AppLayout>
        <ChatWindow :messages="messages" />
        <ChatInput @submit="sendMessage" />
    </AppLayout>
</template>
