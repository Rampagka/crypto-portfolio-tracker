<script setup lang="ts">
import CardWrapper from '~/common/wrappers/card-wrapper.vue'
import type { Wallet } from '~/modules/wallet-list/models/interfaces/wallet.interface'

defineProps<{
    item: Wallet
}>()
</script>

<template>
    <card-wrapper :with-neon-animation="true">
        <div class="flex min-h-[40px] flex-col gap-3 p-4 font-mono">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="font-ui mb-1 text-sm">{{ item.name }}</h3>
                    <p class="text-mute text-[11px]">{{ item.address }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <!--                    <button>?</button>-->
                    <button
                        class="menu-btn border-border flex h-7.5 w-7.5 items-center justify-center rounded-[6px] border"
                    >
                        <Icon name="iconamoon:menu-kebab-vertical" class="text-mute" />
                    </button>
                </div>
            </div>
            <div class="flex items-end justify-between">
                <div>
                    <h2 class="mb-0.5 text-[20px]">${{ item.total }}</h2>
                    <p class="text-mute text-[12px]">{{ item.toncoinCount }} TON</p>
                </div>
                <div>Chart</div>
            </div>
            <div class="divide h-[1px] w-full"></div>
            <div class="flex flex-col gap-2">
                <h4 class="text-mute text-[12px] uppercase">Top tokens</h4>
                <ul class="flex w-full flex-col gap-1">
                    <li
                        v-for="token in item.topTokens"
                        :key="token.id"
                        class="flex items-center justify-between text-[12px]"
                    >
                        <p class="flex items-center gap-2">
                            <span class="bg-accent block h-1 w-1 shrink-0 rounded-full"></span>
                            {{ token.name }}
                        </p>
                        <p class="text-mute">{{ token.total }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </card-wrapper>
</template>

<style scoped>
.divide {
    background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.333), transparent);
}

.menu-btn,
.menu-btn span {
    transition: 0.18s;
}

.menu-btn:active,
.menu-btn:active span {
    border-color: var(--color-mute);
    color: white;
}
</style>
