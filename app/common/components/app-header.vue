<script setup lang="ts"></script>

<template>
    <header
        class="header bg-bg border-border fixed top-0 right-0 left-0 z-100 flex min-h-[58px] items-center justify-between border-b px-4"
    >
        <h1 class="logo text-[24px] tracking-wide">tracker</h1>
        <button class="h-6 w-6 text-[24px]">
            <Icon name="solar:hamburger-menu-linear" />
        </button>
    </header>
</template>

<style scoped>
.header {
    box-shadow:
        rgba(0, 229, 255, 0.12) 0px 1px 0px,
        rgba(0, 229, 255, 0.25) 0px 8px 24px -12px;
}

.logo {
    color: transparent;
    -webkit-text-stroke: 1px rgb(0, 229, 255);
    text-shadow:
        rgb(0, 229, 255) 0px 0px 8px,
        rgba(0, 229, 255, 0.4) 0px 0px 16px;
}
</style>
