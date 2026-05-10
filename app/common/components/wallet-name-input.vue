<script setup lang="ts">
const props = defineProps<{
    modelValue?: string
    defaultValue?: string
    error?: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const onFocus = () => {
    if (props.defaultValue && props.modelValue === props.defaultValue) {
        emit('update:modelValue', '')
    }
}

const onBlur = () => {
    if (props.defaultValue && props.modelValue === '') {
        emit('update:modelValue', props.defaultValue)
    }
}
</script>

<template>
    <input-ui
        :model-value="modelValue"
        :error="error"
        placeholder="Add a name for your wallet"
        autocomplete="none"
        @update:model-value="emit('update:modelValue', $event)"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>
