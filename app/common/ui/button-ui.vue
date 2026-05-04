<script setup lang="ts">
defineProps<{
    variant?: 'primary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    disabled?: boolean
}>()
</script>

<template>
    <button
        :class="['btn', `btn--${variant ?? 'primary'}`, `btn--${size ?? 'md'}`]"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>

<style scoped>
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: var(--font-ui);
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.18s ease;
    border: 1px solid transparent;
    white-space: nowrap;
}

.btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

/* Sizes */
.btn--sm {
    height: 32px;
    padding: 0 12px;
    font-size: 11px;
}

.btn--md {
    height: 42px;
    padding: 0 18px;
    font-size: 12px;
}

/* Variants */
.btn--primary {
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent);
    border-color: var(--color-accent);
    box-shadow: 0 0 16px color-mix(in srgb, var(--color-accent) 30%, transparent);
}

.btn--primary:not(:disabled):hover {
    background: color-mix(in srgb, var(--color-accent) 25%, transparent);
    box-shadow:
        0 0 24px color-mix(in srgb, var(--color-accent) 50%, transparent),
        inset 0 0 12px color-mix(in srgb, var(--color-accent) 15%, transparent);
}

.btn--ghost {
    background: transparent;
    color: var(--color-mute);
    border-color: var(--color-border);
}

.btn--ghost:not(:disabled):hover {
    color: #fff;
    border-color: rgba(136, 136, 170, 0.45);
    background: rgba(255, 255, 255, 0.04);
}

.btn--danger {
    background: color-mix(in srgb, var(--color-loss) 12%, transparent);
    color: var(--color-loss);
    border-color: var(--color-loss);
}

.btn--danger:not(:disabled):hover {
    background: color-mix(in srgb, var(--color-loss) 22%, transparent);
    box-shadow: 0 0 18px color-mix(in srgb, var(--color-loss) 40%, transparent);
}
</style>
