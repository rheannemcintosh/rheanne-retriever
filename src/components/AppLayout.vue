<script setup>
import AppHeader from './AppHeader.vue';
</script>

<template>
    <div class="app-layout">
        <AppHeader />
        <main class="app-layout__main">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.app-layout {
    width: 760px;
    max-width: 100%;
    margin: 0 auto;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
}

.app-layout__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 32px 0;
}
</style>
