<script setup lang="ts">
import { PortfolioContent } from '~/modules/portfolio'

const route = useRoute()
const chain = computed(() => {
    const id = route.params.id
    return (Array.isArray(id) ? id[0] : id)?.toUpperCase() ?? 'TON'
})

useHead({
    title: computed(() => `${chain.value} Portfolio`),
    meta: [
        {
            name: 'description',
            content: 'Astra tracker - free tracker in TON blockchain without authorization',
        },
    ],
})
</script>

<template>
    <main class="flex flex-col gap-5">
        <portfolio-content />
    </main>
</template>

<style scoped></style>
