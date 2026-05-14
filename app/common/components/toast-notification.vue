<script setup lang="ts">
const toast = useToast()
</script>

<template>
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="toast" class="toast-wrap">
                <div
                    class="bg-surf2 border-border text-gain flex items-center gap-2 rounded-full border px-4 text-[14px] font-medium"
                    style="height: 44px"
                >
                    <Icon name="iconamoon:check-fill" size="1.2em" class="shrink-0" />
                    {{ toast }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.toast-wrap {
    position: fixed;
    bottom: calc(24px + env(safe-area-inset-bottom));
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 10000;
    pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
