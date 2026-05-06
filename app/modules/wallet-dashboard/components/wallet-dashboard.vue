<script setup lang="ts">
import CardWrapper from '~/common/wrappers/card-wrapper.vue'
</script>

<template>
    <card-wrapper :with-styled-angles="true" :with-neon-animation="true">
        <div class="flex flex-col gap-2 p-4 font-mono">
            <p class="flex items-center gap-2 text-xl text-[12px] tracking-widest uppercase">
                <span class="text-mute">Total balance</span>
                <span class="text-mute">·</span>
                <span class="text-accent">All wallets</span>
            </p>
            <div class="flex items-end justify-between">
                <div class="flex flex-col gap-1.5">
                    <h2 class="text-[32px] leading-10 font-bold tracking-tighter">$6,300.84</h2>
                    <p class="flex items-center gap-2 text-sm">
                        <span class="text-gain">▲ +181.85 (+2.98%)</span>
                        <span class="text-mute">24h</span>
                    </p>
                </div>
                <div>CHART</div>
            </div>
        </div>
    </card-wrapper>
</template>
