<script setup lang="ts">
defineProps<{
    color?: string
    isActive: boolean
}>()
</script>

<template>
    <button
        class="flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-[16px]"
        :class="
            isActive
                ? 'text-accent border-accent opacity-100'
                : 'border-white text-white opacity-50'
        "
    >
        <span class="block h-1.5 w-1.5 rounded-full" :class="isActive ? 'bg-accent' : 'bg-white'" />
        <slot />
    </button>
</template>
