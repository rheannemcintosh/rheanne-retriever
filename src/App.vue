<script setup>
import AppLayout from './components/AppLayout.vue';
import ChatWindow from './components/ChatWindow.vue';
import ChatInput from './components/ChatInput.vue';
</script>

<template>
    <AppLayout>
        <ChatWindow :messages="[]" />
        <ChatInput @submit="() => {}" />
    </AppLayout>
</template>
