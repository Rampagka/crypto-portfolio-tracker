<script setup lang="ts"></script>

<template>
    <div>
        <app-header />
        <div class="relative z-1 mx-auto min-h-screen max-w-[768px] md:max-w-[1100px]">
            <div class="layout-content min-h-[calc(100dvh-65px)] px-4 pb-[40px]">
                <slot />
            </div>
            <app-footer />
        </div>
    </div>
</template>

<style scoped></style>
