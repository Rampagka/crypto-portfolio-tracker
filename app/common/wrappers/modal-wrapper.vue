<script setup lang="ts">
import { closeModal, useCurrentModal } from '@/common/composables/useModal'
import type { ModalAnimation } from '~/common/models/interfaces/modal.interface'
const modal = useCurrentModal()

const getTransitionName = (animation?: ModalAnimation) => {
    if (animation === 'none') return undefined
    return `modal-${animation || 'slide-bottom'}`
}
</script>

<template>
    <Teleport to="body">
        <div
            v-if="modal"
            class="fixed inset-0 z-999 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
            :class="[modal && modal.modalOptions.transparent ? 'bg-transparent' : '']"
            @click.self="!modal.modalOptions.disableBackdropClose && closeModal()"
        >
            <Transition :name="getTransitionName(modal.modalOptions.animation)" appear>
                <div
                    class="fixed bottom-0 w-full overflow-y-auto"
                    :class="[
                        modal.modalOptions.className,
                        modal.modalOptions.bare ? 'inset-0' : 'bg-surf2 mx-4 pb-3',
                        modal.modalOptions.bare
                            ? ''
                            : modal.modalOptions.fullScreen
                              ? 'h-dvh rounded-none'
                              : 'max-h-[85vh] rounded-t-xl',
                    ]"
                >
                    <div class="px-4">
                        <div class="flex items-center justify-center pt-2 pb-4">
                            <div class="bg-mute h-1 w-16 rounded-2xl" />
                        </div>
                        <h4
                            v-if="modal.modalOptions.title"
                            class="text-center text-[17px] leading-5.5 font-semibold"
                        >
                            {{ modal.modalOptions.title }}
                        </h4>
                    </div>

                    <component
                        :is="modal.component"
                        :class="modal.modalOptions.bare ? '' : 'px-4 pt-4 pb-8'"
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
</style>
