// import { closeModal, useCurrentModal } from '@/common/composables/useModal'
//
// import { computed } from 'vue'
//
// export function useModalInstance() {
//     const modal = useCurrentModal()
//
//     return {
//         isOpen: computed(() => !!modal.value),
//         modalComponent: computed(() => modal.value?.component ?? null),
//         props: computed(() => modal.value?.props ?? {}),
//         options: computed(() => modal.value?.modalOptions ?? {}),
//         fullScreen: computed(() => modal.value?.modalOptions.fullScreen ?? false),
//         disableBackdropClose: computed(
//             () => modal.value?.modalOptions.disableBackdropClose ?? false,
//         ),
//         className: computed(() => modal.value?.modalOptions.className ?? ''),
//         transparent: computed(() => modal.value?.modalOptions.transparent ?? false),
//         bare: computed(() => modal.value?.modalOptions.bare ?? false),
//         title: computed(() => modal.value?.modalOptions.title ?? ''),
//         headerBorder: computed(() => modal.value?.modalOptions.headerBorder ?? false),
//
//         closeModal,
//     }
// }
