# Storybook Theme Switcher

## Overview
A theme switcher has been added to Storybook that allows switching between light, dark, and system modes for each story. This helps developers test how components look in different themes.

## Features

### Theme Modes
- **Light**: Forces light theme regardless of system preference
- **Dark**: Forces dark theme regardless of system preference  
- **System**: Automatically follows the user's OS theme preference

### How to Use

1. **Toolbar Control**: Look for the "Theme" button in the Storybook toolbar (top of the screen)
2. **Theme Selection**: Click the theme button to see three options:
   - 🌞 Light
   - 🌙 Dark  
   - 🖥️ System
3. **Real-time Updates**: The selected theme is applied immediately to all stories
4. **System Integration**: When "System" is selected, stories automatically update when you change your OS theme

### Technical Implementation

- **Theme Decorator**: Automatically applies the selected theme to each story
- **CSS Classes**: Uses Tailwind's `dark:` classes for theme switching
- **System Detection**: Listens for `prefers-color-scheme` changes when in system mode
- **Global State**: Theme selection persists across story navigation

### Testing Components

The theme switcher is particularly useful for testing:
- Components with dark mode styles
- Color contrast in different themes
- Visual consistency across themes
- Accessibility in different lighting conditions

### Example Usage

When viewing the BaseButton story:
1. Switch to "Light" theme - see light backgrounds and dark text
2. Switch to "Dark" theme - see dark backgrounds and light text  
3. Switch to "System" - automatically matches your OS preference
4. Change your OS theme while in "System" mode - watch the story update automatically