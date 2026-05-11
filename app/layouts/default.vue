<script setup lang="ts"></script>

<template>
    <div class="relative z-1 mx-auto min-h-screen max-w-[768px]">
        <app-header />
        <div class="min-h-[calc(100dvh-65px)] px-4 pt-[80px] pb-[40px]">
            <slot />
        </div>
        <app-footer />
    </div>
</template>

<style scoped></style>
