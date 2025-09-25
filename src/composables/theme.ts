import { ref, readonly, toValue, type MaybeRef } from 'vue'
import { useStorage, usePreferredDark } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useTheme = (documentElement: MaybeRef<HTMLElement> = document.documentElement) => {
  const root = toValue(documentElement)

  const theme = useStorage<ThemeMode>('theme', 'system')
  const prefersDark = usePreferredDark()
  const isDark = ref(false)

  function applyTheme() {
    if (theme.value === 'system') {
      isDark.value = prefersDark.value
    } else {
      isDark.value = theme.value === 'dark'
    }
    root.classList.toggle('dark', isDark.value)
  }

  function setTheme(newTheme: ThemeMode) {
    theme.value = newTheme
    applyTheme()
  }

  return {
    theme: readonly(theme),
    applyTheme,
    setTheme,
  }
}
