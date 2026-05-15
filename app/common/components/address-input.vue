<script setup lang="ts">
defineProps<{
    modelValue?: string
    error?: string
    placeholder: string
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
        role="address-input"
        :placeholder="placeholder"
        autocomplete="none"
        data-test="address-input"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <template #append>
            <button
                class="add font-ui text-mute px-3.5 text-[12px] uppercase"
                :disabled="!modelValue?.length"
                data-test="add-btn"
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

.add:active:not(:disabled) {
    outline: 1px solid var(--color-accent);
    border-radius: 0 6px 6px 0;
    color: white;
}

.add:disabled {
    cursor: not-allowed;
}
</style>
