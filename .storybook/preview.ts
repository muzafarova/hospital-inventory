import { type Preview, setup } from '@storybook/vue3-vite'
import { withTheme, setTheme } from './theme-decorator'
import { App } from 'vue'
import { createPinia } from 'pinia'
import '@/css/style.css'

const pinia = createPinia()

const preview: Preview = {
  tags: ['autodocs'],

  parameters: {
    docs: {
      toc: true,
      codePanel: true,
    },
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
          { value: 'normal', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
        onChange: (value: string) => {
          setTheme(value)
        },
      },
    },
  },

  decorators: [() => ({ template: '<div class="p-4 min-h-36"><story /></div>' }), withTheme],
}

setup((app: App) => {
  app.use(pinia)
})

export default preview
