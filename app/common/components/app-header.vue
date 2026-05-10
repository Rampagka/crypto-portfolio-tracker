<script setup lang="ts"></script>

<template>
    <header
        class="header bg-bg border-border fixed top-0 right-0 left-0 z-100 flex min-h-[58px] items-center justify-between border-b px-4"
    >
        <h1 class="logo text-[24px] tracking-wide">ASTRA</h1>
        <button class="h-6 w-6 text-[24px]">
            <Icon name="solar:hamburger-menu-linear" />
        </button>
        <!--        <nav class="flex items-center gap-2">-->
        <!--            <NuxtLink to="/" class="text-[16px]">Portfolio</NuxtLink>-->
        <!--            <NuxtLink to="/explorer/ton" class="text-[16px]"> Explorer </NuxtLink>-->
        <!--        </nav>-->
    </header>
</template>

<style scoped>
.header {
    box-shadow:
        color-mix(in srgb, var(--color-accent), transparent 88%) 0px 1px 0px,
        color-mix(in srgb, var(--color-accent), transparent 75%) 0px 8px 24px -12px;
    transition: box-shadow 0.3s ease;
}

.logo {
    color: transparent;
    -webkit-text-stroke: 1px var(--color-accent);
    text-shadow:
        var(--color-accent) 0px 0px 8px,
        color-mix(in srgb, var(--color-accent), transparent 60%) 0px 0px 16px;
    transition: text-shadow 0.3s ease;
}
</style>
