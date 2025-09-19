import { type Decorator } from '@storybook/vue3-vite'

export const setTheme = (themeValue: string) => {
  const root = document.documentElement

  if (themeValue === 'normal') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', prefersDark)
  } else if (themeValue === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export const withTheme: Decorator = (story, context) => {
  setTheme(context.globals.theme || 'normal')

  return {
    components: { Story: story() },
    // .mdx pages have white background; here's one way to restore the themed background for each story preview:
    template: `<div
        class="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
      ><Story /></div>`,
  }
}
