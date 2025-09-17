import { type Preview } from '@storybook/vue3-vite'
import { withTheme } from './theme-decorator'
import '@/css/style.css'

// Apply theme function
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

// Listen for system theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', () => {
  // Only apply if current theme is system
  const currentTheme = (window as any).__STORYBOOK_GLOBALS__?.theme || 'system'
  if (currentTheme === 'system') {
    applyTheme('system')
  }
})

const preview: Preview = {
  tags: ['autodocs'],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'desktop' },
        ],
        dynamicTitle: true,
        onChange: (value: string) => {
          applyTheme(value)
        },
      },
    },
  },

  decorators: [withTheme],
}

// setup((app: App) => {
//   app.use(pinia).use(router)
// })

export default preview
