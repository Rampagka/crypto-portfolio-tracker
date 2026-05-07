<script setup lang="ts">
defineProps<{
    modelValue?: string
    error?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'add'): void
}>()
</script>

<template>
    <input-ui
        :model-value="modelValue"
        :error="error"
        placeholder="Paste TON address..."
        autocomplete="none"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <template #append>
            <button
                class="add font-ui text-mute px-3.5 text-[12px] uppercase"
                @click.prevent="emit('add')"
            >
                + Add
            </button>
        </template>
    </input-ui>
</template>

<style scoped>
.add {
    border-left: 1px solid var(--color-border);
    transition: 0.18s ease;
    outline: 1px solid transparent;
}

.add:active {
    outline: 1px solid var(--color-accent);
    border-radius: 0 6px 6px 0;
    color: white;
}
</style>
