import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeMode>('system')
  const isDark = ref(false)

  // Initialize theme from localStorage or default to system
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode
    const validThemes: ThemeMode[] = ['light', 'dark', 'system']
    if (savedTheme && validThemes.includes(savedTheme)) {
      theme.value = savedTheme
    }
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

  // Set theme and persist to localStorage
  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
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