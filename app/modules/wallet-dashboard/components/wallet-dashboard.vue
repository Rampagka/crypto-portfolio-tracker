<script setup lang="ts"></script>

<template>
    <div class="bg-surf dashboard relative flex flex-col gap-2 rounded-lg p-4">
        <div class="border-accent absolute bottom-1.5 left-1.5 h-3 w-3 border-s border-b" />
        <div class="border-accent absolute top-1.5 left-1.5 h-3 w-3 border-s border-t" />
        <div class="border-accent absolute right-1.5 bottom-1.5 h-3 w-3 border-r border-b" />
        <div class="border-accent absolute top-1.5 right-1.5 h-3 w-3 border-t border-r" />
        <p class="flex items-center gap-2 text-xl text-[12px] tracking-widest uppercase">
            <span class="opacity-50">Total balance</span>
            <span class="opacity-50">·</span>
            <span class="text-accent">All wallets</span>
        </p>
        <div class="flex items-end justify-between font-mono">
            <div class="flex flex-col gap-1">
                <h2 class="text-[40px] leading-12.5 font-bold tracking-tighter">$6,300.84</h2>
                <p class="flex items-center gap-2 text-sm">
                    <span class="text-gain">▲ +181.85 (+2.98%)</span>
                    <span class="opacity-50">24h</span>
                </p>
            </div>
            <div>CHART</div>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    border: 1px solid color-mix(in srgb, var(--color-accent), transparent 70%);
    animation: 15s linear infinite alternate 'neon-flash';
}
</style>
