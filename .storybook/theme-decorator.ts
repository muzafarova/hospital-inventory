import { type Decorator } from '@storybook/vue3-vite'

export const setTheme = (themeValue: string) => {
  const root = document.documentElement

  if (themeValue === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', prefersDark)
  } else if (themeValue === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export const withTheme: Decorator = (story, context) => {
  setTheme(context.globals.theme || 'system')

  return {
    components: { Story: story() },
    template: '<Story />',
  }
}
