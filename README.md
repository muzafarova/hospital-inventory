# Hospital Inventory

This is an SPA app build with [Vue3](https://vuejs.org/) (composition API), [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/), and [Vite.js](https://vite.dev/).
Backend is mocked with [MSW](https://mswjs.io/)

For simplicity, no UI libriaries used in this iteration.
UI is styled with [Tailwind 4](https://tailwindcss.com/blog/tailwindcss-v4)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

Note: planned to use Storybook and convert stories into unit tests, but run out of time due to the amount of features to implement

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
