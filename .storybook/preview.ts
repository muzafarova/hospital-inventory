import { type Preview } from '@storybook/vue3-vite'
import { withTheme, setTheme } from './theme-decorator'
import '@/css/style.css'

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
          setTheme(value)
        },
      },
    },
  },

  decorators: [withTheme],
}

export default preview
