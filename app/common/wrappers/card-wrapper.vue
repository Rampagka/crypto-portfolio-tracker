<script setup lang="ts">
defineProps<{
    withStyledAngles?: boolean
    withNeonAnimation?: boolean
}>()
</script>

<template>
    <div class="bg-surf card relative rounded-lg" :class="{ animate: withNeonAnimation }">
        <template v-if="withStyledAngles">
            <div class="border-accent absolute bottom-1.5 left-1.5 h-3 w-3 border-s border-b" />
            <div class="border-accent absolute top-1.5 left-1.5 h-3 w-3 border-s border-t" />
            <div class="border-accent absolute right-1.5 bottom-1.5 h-3 w-3 border-r border-b" />
            <div class="border-accent absolute top-1.5 right-1.5 h-3 w-3 border-t border-r" />
        </template>
        <slot />
    </div>
</template>

<style scoped>
.card {
    border: 1px solid color-mix(in srgb, var(--color-accent), transparent 70%);
}

.animate {
    animation: 15s linear infinite 'neon-flash';
}
</style>
