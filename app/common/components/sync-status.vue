<script setup lang="ts">
const store = usePortfolioStore()

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
    timer = setInterval(() => {
        now.value = new Date()
    }, 10_000)
})

onUnmounted(() => clearInterval(timer))

const timeLabel = computed(() => {
    if (!store.lastSyncedAt) return null
    return store.lastSyncedAt.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short',
    })
})

const agoLabel = computed(() => {
    if (!store.lastSyncedAt) return null
    const diff = Math.floor((now.value.getTime() - store.lastSyncedAt.getTime()) / 1000)
    if (diff < 30) return 'just now'
    if (diff < 90) return '1 min ago'
    return `${Math.round(diff / 60)} min ago`
})
</script>

<template>
    <div class="flex items-center gap-2">
        <div class="live-dot bg-gain h-1.5 w-1.5 rounded-full" />
        <p class="text-mute font-mono text-[10px] tracking-wide uppercase">
            <template v-if="timeLabel">live · synced {{ timeLabel }} · {{ agoLabel }}</template>
            <template v-else>live · waiting for sync</template>
        </p>
    </div>
</template>

<style scoped>
.live-dot {
    box-shadow: rgb(0, 255, 136) 0px 0px 6px;
    animation: 1.6s ease 0s infinite normal none running pulse;
}
</style>
