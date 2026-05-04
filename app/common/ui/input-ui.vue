<script setup lang="ts">
defineProps<{
    modelValue?: string
    placeholder?: string
    error?: string
    prefix?: string
    type?: string
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>

<template>
    <div class="input-wrap">
        <div :class="['input-box', { 'input-box--error': error }]">
            <span class="input-prefix">{{ prefix ?? '>' }}</span>
            <input
                :value="modelValue"
                :placeholder="placeholder"
                :type="type ?? 'text'"
                class="input-field"
                v-bind="$attrs"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
            <slot name="append" />
        </div>
        <p v-if="error" class="input-error">! {{ error }}</p>
    </div>
</template>

<style scoped>
.input-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.input-box {
    display: flex;
    align-items: stretch;
    background: var(--color-surf);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.18s ease;
}

.input-box:focus-within {
    border-color: var(--color-accent);
    box-shadow:
        0 0 0 3px color-mix(in srgb, var(--color-accent) 15%, transparent),
        0 0 18px -4px color-mix(in srgb, var(--color-accent) 60%, transparent);
}

.input-box--error {
    border-color: var(--color-loss);
}

.input-box--error:focus-within {
    border-color: var(--color-loss);
    box-shadow:
        0 0 0 3px color-mix(in srgb, var(--color-loss) 15%, transparent),
        0 0 18px -4px color-mix(in srgb, var(--color-loss) 40%, transparent);
}

.input-prefix {
    padding: 0 10px;
    display: grid;
    place-items: center;
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--color-dim);
    transition: color 0.18s ease;
}

.input-box:focus-within .input-prefix {
    color: var(--color-accent);
}

.input-field {
    flex: 1;
    height: 42px;
    padding: 0 6px;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.2px;
}

.input-error {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.5px;
    color: var(--color-loss);
}
</style>
