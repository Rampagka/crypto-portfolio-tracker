import type { Config } from 'tailwindcss'

export default {
    content: [],
    theme: {
        extend: {
            colors: {
                accent: 'var(--color-accent)',
                ton: 'var(--color-ton)',
                eth: 'var(--color-eth)',
                purple: 'var(--color-purple)',
                gain: 'var(--color-gain)',
                loss: 'var(--color-loss)',
                mute: 'var(--color-mute)',
                dim: 'var(--color-dim)',
                bg: 'var(--color-bg)',
                surf: 'var(--color-surf)',
                surf2: 'var(--color-surf2)',
            },
            fontFamily: {
                ui: 'var(--font-ui)',
                mono: 'var(--font-mono)',
            },
        },
    },
} satisfies Config
