<script setup lang="ts">
defineProps<{
    isActive: boolean
}>()
</script>

<template>
    <button
        class="flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-sm tracking-widest uppercase"
        :class="isActive ? 'text-accent border-accent opacity-100' : 'border-mute text-mute'"
        :style="{
            boxShadow: isActive
                ? 'color-mix(in srgb, var(--color-accent), transparent 50%) 0px 0px 16px, color-mix(in srgb, var(--color-accent), transparent 50%) 0px 0px 12px inset'
                : '',
        }"
    >
        <span
            class="block h-1.5 w-1.5 rounded-full"
            :class="isActive ? 'bg-accent' : 'bg-mute'"
            :style="{
                boxShadow: isActive ? 'var(--color-accent) 0px 0px 8px' : '',
            }"
        />
        <slot />
    </button>
</template>

<style scoped></style>
