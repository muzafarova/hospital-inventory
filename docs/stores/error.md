# Error Store Documentation

## Overview
The `useErrorStore` is a lightweight Pinia store responsible for centralized error handling and user notification management. It provides a simple interface for reporting errors and displaying them to users throughout the application.

## Dependencies
- **Vue**: `ref` for reactive state management
- **Pinia**: `defineStore` for store definition

## State

### Reactive State
| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `notifications` | `ref<string[]>` | Array of error messages to display to users | `[]` |

## Actions

### `report(err: unknown, displayMessage: string)`
Reports an error and adds a user-friendly message to the notifications queue.

**Parameters:**
- `err: unknown` - The actual error object (logged to console)
- `displayMessage: string` - User-friendly error message to display

**Behavior:**
1. Logs the actual error to console using `console.error()`
2. Adds the display message to the notifications array
3. Notifications accumulate until manually cleared

**Usage Example:**
```typescript
const errorStore = useErrorStore()

try {
  await riskyOperation()
} catch (error) {
  errorStore.report(error, 'Failed to complete operation')
}
```

### `clear()`
Clears all pending notifications.

**Behavior:**
- Resets the notifications array to empty
- Typically called before new operations to clear old errors
- Used by other stores to reset error state

**Usage Example:**
```typescript
const errorStore = useErrorStore()

// Clear errors before starting new operation
errorStore.clear()
await performOperation()
```

## Store Interface
The store exposes the following interface:
```typescript
{
  report: (err: unknown, displayMessage: string) => void,
  clear: () => void,
  notifications: Ref<string[]>
}
```

## Usage Patterns

### Error Reporting with Context
```typescript
const errorStore = useErrorStore()

try {
  const result = await apiCall()
} catch (error) {
  errorStore.report(error, `Failed to ${operationName}`)
}
```

### Pre-operation Error Clearing
```typescript
const errorStore = useErrorStore()

// Clear previous errors before new operation
errorStore.clear()
try {
  await newOperation()
} catch (error) {
  errorStore.report(error, 'Operation failed')
}
```

### Reactive Notifications Display
```typescript
const errorStore = useErrorStore()

// In template or component
watchEffect(() => {
  if (errorStore.notifications.length > 0) {
    // Display notifications to user
    errorStore.notifications.forEach(message => {
      showToast(message)
    })
  }
})
```

## Integration Points

### Auth Store Integration
The error store is used by the auth store for:
- Login failures: "Failed to login"
- Logout failures: "Failed to logout"
- Error clearing before authentication attempts

### Hospital Store Integration  
The error store is used by the hospital store for:
- Hospital data loading failures: "Failed to fetch hospital"
- Error clearing before data fetching

### Inventory Store Integration
The error store is used by the inventory store for:
- Product loading failures: "Failed to load inventory"
- Product removal failures: "Failed to remove inventory"
- Product creation failures: "Failed to add inventory item"
- Product update failures: "Failed to update inventory item"
- Error clearing before operations

## Design Patterns

### Separation of Concerns
- **Technical Error**: Logged to console for debugging
- **User Message**: Added to notifications for UI display
- This separation allows detailed logging while showing user-friendly messages

### Accumulative Notifications
- Notifications accumulate rather than replacing each other
- Allows multiple errors to be displayed simultaneously
- Manual clearing required to reset state

### Centralized Error Handling
- Single point of error management across the application
- Consistent error reporting interface
- Simplifies error handling in other stores

## Component Integration

The error store is designed to integrate with notification components:

```vue
<template>
  <div v-for="notification in errorStore.notifications" :key="notification">
    {{ notification }}
  </div>
</template>

<script setup>
import { useErrorStore } from '@/stores/error'

const errorStore = useErrorStore()
</script>
```

## Best Practices

### Error Message Guidelines
- Use clear, actionable error messages
- Avoid technical jargon in display messages
- Be specific about what failed
- Consider providing next steps when appropriate

### Error Clearing Strategy
- Clear errors before new operations to avoid stale messages
- Consider automatic clearing after successful operations
- Don't clear errors too aggressively - users need time to read them

### Logging Strategy
- Always log the actual error for debugging
- Include context in console logs when helpful
- Use appropriate log levels (error, warn, info)

## Testing Considerations

- Test error accumulation behavior
- Verify console logging occurs
- Test clearing functionality
- Mock console methods to verify logging
- Test integration with notification components

## Potential Enhancements

### Error Categorization
```typescript
// Could be extended to support error types
report(err: unknown, displayMessage: string, type: 'error' | 'warning' | 'info')
```

### Auto-clearing
```typescript
// Could support automatic clearing after timeout
report(err: unknown, displayMessage: string, autoClear?: number)
```

### Error Context
```typescript
// Could include additional context
report(err: unknown, displayMessage: string, context?: Record<string, unknown>)
```

## Performance Considerations

- Minimal memory footprint with simple array storage
- No complex reactive computations
- Efficient for typical error volumes
- Consider limiting notification array size for high-error scenarios

## Security Considerations

- Only user-friendly messages are exposed to UI
- Sensitive error details remain in console logs
- No error data persistence or transmission