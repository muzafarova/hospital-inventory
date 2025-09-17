import { type Decorator } from '@storybook/vue3-vite'

export const withTheme: Decorator = (story, context) => {
  // Apply theme to document
  const applyTheme = (themeValue: string) => {
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
  
  // Apply initial theme
  const theme = context.globals.theme || 'system'
  applyTheme(theme)
  
  // Return the story
  return story
}