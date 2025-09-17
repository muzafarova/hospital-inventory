import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = useStorage<ThemeMode>('theme', 'system')
  const isDark = ref(false)

  // Initialize theme - useStorage handles persistence automatically
  const initTheme = () => {
    applyTheme()
  }

  // Apply theme based on current mode
  const applyTheme = () => {
    const root = document.documentElement
    
    if (theme.value === 'system') {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      root.classList.toggle('dark', prefersDark)
    } else {
      // Use manual selection
      isDark.value = theme.value === 'dark'
      root.classList.toggle('dark', theme.value === 'dark')
    }
  }

  // Set theme - useStorage handles persistence automatically
  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme
    applyTheme()
  }

  // Watch for system theme changes when in system mode
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (theme.value === 'system') {
      isDark.value = e.matches
      document.documentElement.classList.toggle('dark', e.matches)
    }
  }

  // Listen for system theme changes
  mediaQuery.addEventListener('change', handleSystemThemeChange)

  // Watch for theme changes and apply them automatically
  watch(theme, () => {
    applyTheme()
  }, { immediate: true })

  // Cleanup listener on store destruction
  const cleanup = () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }

  return {
    theme,
    isDark,
    initTheme,
    setTheme,
    cleanup
  }
})