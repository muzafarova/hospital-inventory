import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useStorage, useMediaQuery } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = useStorage<ThemeMode>('theme', 'system')
  const isDark = ref(false)
  
  // Use VueUse's useMediaQuery for system theme detection
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  // Initialize theme - useStorage handles persistence automatically
  const initTheme = () => {
    applyTheme()
  }

  // Apply theme based on current mode
  const applyTheme = () => {
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

  // Set theme - useStorage handles persistence automatically
  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme
    applyTheme()
  }

  // Watch for theme changes and apply them automatically
  watch(theme, () => {
    applyTheme()
  }, { immediate: true })

  // Watch for system theme changes when in system mode
  watch(prefersDark, () => {
    if (theme.value === 'system') {
      isDark.value = prefersDark.value
      document.documentElement.classList.toggle('dark', prefersDark.value)
    }
  })

  // Cleanup function (no longer needed for manual event listeners)
  const cleanup = () => {
    // useMediaQuery handles cleanup automatically
  }

  return {
    theme,
    isDark,
    initTheme,
    setTheme,
    cleanup
  }
})