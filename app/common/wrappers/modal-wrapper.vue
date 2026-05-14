<script setup lang="ts">
import { closeModal, useCurrentModal } from '@/common/composables/useModal'
import type { ModalAnimation } from '~/common/models/interfaces/modal.interface'

const modal = useCurrentModal()

const getTransitionName = (animation?: ModalAnimation) => {
    if (animation === 'none') return undefined
    return `modal-${animation || 'slide-bottom'}`
}

const keyboardOffset = ref(0)

onMounted(() => {
    if (!window.visualViewport) return
    const update = () => {
        const offset =
            window.innerHeight - window.visualViewport!.offsetTop - window.visualViewport!.height
        keyboardOffset.value = Math.max(0, offset)
    }
    window.visualViewport.addEventListener('resize', update)
    window.visualViewport.addEventListener('scroll', update)
    onUnmounted(() => {
        window.visualViewport?.removeEventListener('resize', update)
        window.visualViewport?.removeEventListener('scroll', update)
    })
})

const bottomStyle = computed(() =>
    keyboardOffset.value > 0 ? { bottom: `${6 + keyboardOffset.value}px` } : {},
)
</script>

<template>
    <Teleport to="body">
        <div
            v-if="modal"
            class="fixed inset-0 z-999 flex items-center justify-center bg-[rgba(0,0,0,0.4)] md:bg-[rgba(0,0,0,0.6)]"
            :class="[modal && modal.modalOptions.transparent ? 'bg-transparent' : '']"
            @click.self="!modal.modalOptions.disableBackdropClose && closeModal()"
        >
            <Transition :name="getTransitionName(modal.modalOptions.animation)" appear>
                <div
                    class="modal-scroll-target w-[calc(100dvw - 12px)] fixed right-[6px] bottom-[6px] left-[6px] overflow-y-auto md:right-auto md:bottom-auto md:left-auto md:block md:h-auto md:w-full md:max-w-[400px] md:rounded-lg"
                    :style="bottomStyle"
                    :class="[
                        modal.modalOptions.className,
                        modal.modalOptions.bare ? 'inset-0' : 'bg-modal pb-3',
                        modal.modalOptions.bare
                            ? ''
                            : modal.modalOptions.fullScreen
                              ? 'h-dvh rounded-none'
                              : 'max-h-[85vh] rounded-[14px]',
                    ]"
                >
                    <div
                        class="mb-4 px-4 md:mb-0 md:flex md:items-center md:justify-between md:py-4"
                    >
                        <div class="flex items-center justify-center pt-2 pb-4 md:hidden">
                            <div class="bg-mute h-1 w-16 rounded-2xl" />
                        </div>
                        <h4
                            v-if="modal.modalOptions.title"
                            class="text-center text-[17px] leading-5.5 font-semibold md:text-[22px]"
                        >
                            {{ modal.modalOptions.title }}
                        </h4>
                        <button
                            class="hidden transition-opacity duration-[0.1s] ease-out active:opacity-50 md:flex"
                            @click="closeModal"
                        >
                            <Icon name="iconamoon:close" size="2em" />
                        </button>
                    </div>

                    <component
                        :is="modal.component"
                        :class="modal.modalOptions.bare ? '' : 'px-4 pt-4 pb-8 md:pb-2'"
                        v-bind="modal.props"
                        @close="closeModal"
                        @result="closeModal"
                    />
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<style scoped>
/* slide-bottom (default) */
.modal-slide-bottom-enter-active,
.modal-slide-bottom-leave-active {
    transition: transform 0.2s ease;
}
.modal-slide-bottom-enter-from,
.modal-slide-bottom-leave-to {
    transform: translateY(100%);
}

@media screen and (min-width: 768px) {
    .modal-slide-bottom-enter-active,
    .modal-slide-bottom-leave-active {
        transition: opacity 0.15s ease;
    }
    .modal-slide-bottom-enter-from,
    .modal-slide-bottom-leave-to {
        transform: translateY(0%);
        opacity: 0;
    }
}
</style>
