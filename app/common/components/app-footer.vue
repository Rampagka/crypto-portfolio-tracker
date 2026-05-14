<script setup lang="ts">
import telegramIcon from '~/assets/contacts-logo/telegram-icon.vue'
import githubIcon from '~/assets/contacts-logo/github-icon.vue'

const contacts = {
    telegram: {
        link: 'https://t.me/rampagka',
        icon: telegramIcon,
    },
    github: {
        link: 'https://github.com/rampagka',
        icon: githubIcon,
    },
}
</script>

<template>
    <footer
        class="footer border-border relative z-1 flex items-center justify-between border-t px-4 py-2"
    >
        <div>
            <p class="text-gain font-mono text-lg">free · open · no auth</p>
            <p class="text-sm">©2026 Astra</p>
        </div>
        <nav class="flex items-center gap-6">
            <a
                v-for="contact in contacts"
                :key="contact.link"
                target="_blank"
                :href="contact.link"
                class="flex h-6 w-6 items-center justify-center overflow-hidden"
            >
                <component :is="contact.icon" />
                <!--                <img :src="contact.icon" alt="contact logo" />-->
            </a>
        </nav>
    </footer>
</template>

<style scoped>
@media screen and (max-width: 768px) {
    .footer {
        box-shadow:
            color-mix(in srgb, var(--color-accent), transparent 88%) 0px -1px 0px,
            color-mix(in srgb, var(--color-accent), transparent 75%) 0px -8px 24px -12px;
        transition: box-shadow 0.3s ease;
        background-color: var(--color-surf);
    }
}
</style>
