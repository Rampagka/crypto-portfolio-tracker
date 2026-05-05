<script setup lang="ts">
import type { Tab } from '~/common/models/interfaces/tab.interface'

defineProps<{
    tabs: Tab[]
    current: string
}>()

const emit = defineEmits<{
    (e: 'selectTab', value: string): void
}>()
</script>

<template>
    <div class="flex items-center gap-2">
        <tab-ui
            v-for="tab in tabs"
            :key="tab.value"
            :is-active="current === tab.value"
            @click="emit('selectTab', tab.value)"
        >
            {{ tab.label }}
        </tab-ui>
    </div>
</template>

<style scoped></style>
