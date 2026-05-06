<script setup lang="ts">
const emit = defineEmits<{
    (e: 'add'): void
}>()
</script>

<template>
    <div>
        <input-ui
            placeholder="Paste TON address..."
            class="input"
            name="address"
            autocomplete="none"
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
    </div>
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
