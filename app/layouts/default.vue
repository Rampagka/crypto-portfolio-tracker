<script setup lang="ts"></script>

<template>
    <div class="relative z-1 mx-auto min-h-screen max-w-[450px]">
        <app-header />
        <div class="px-4 pt-[80px] pb-[40px]">
            <slot />
        </div>
    </div>
</template>

<style scoped></style>
