import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{vue,ts,tsx}', './.storybook/**/*.{ts,js,vue}'],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
      },
    },
  },
} satisfies Config
