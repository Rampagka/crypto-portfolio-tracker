<script setup lang="ts"></script>

<template>
    <div class="relative z-1 mx-auto min-h-screen max-w-[768px] md:max-w-[1100px]">
        <app-header />
        <div
            class="min-h-[calc(100dvh-65px)] px-4 pt-[calc(80px+env(safe-area-inset-top))] pb-[40px] lg:pt-[calc(110px+env(safe-area-inset-top))]"
        >
            <slot />
        </div>
        <app-footer />
    </div>
</template>

<style scoped></style>
