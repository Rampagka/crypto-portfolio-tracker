<script setup lang="ts"></script>

<template>
    <div class="flex items-center gap-2">
        <div class="live-dot bg-gain h-1.5 w-1.5 rounded-full" />
        <p class="text-mute font-mono text-[10px] tracking-wide uppercase">
            live · synced 04:50 UTC
        </p>
    </div>
</template>

<style scoped>
.live-dot {
    box-shadow: rgb(0, 255, 136) 0px 0px 6px;
    animation: 1.6s ease 0s infinite normal none running pulse;
}
</style>
