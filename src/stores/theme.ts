import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useStorage, useMediaQuery } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = useStorage<ThemeMode>('theme', 'system')
  const isDark = ref(false)
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  function applyTheme() {
    const root = document.documentElement

    if (theme.value === 'system') {
      // Use system preference from useMediaQuery
      isDark.value = prefersDark.value
      root.classList.toggle('dark', prefersDark.value)
    } else {
      // Use manual selection
      isDark.value = theme.value === 'dark'
      root.classList.toggle('dark', theme.value === 'dark')
    }
  }

  const setTheme = (newTheme: ThemeMode) => (theme.value = newTheme)

  watch(theme, () => applyTheme(), { immediate: true })

  return {
    theme,
    setTheme,
  }
})
