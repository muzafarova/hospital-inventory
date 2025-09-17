# Hospital Store Documentation

## Overview
The `useHospitalStore` is a Pinia store that manages hospital-specific data and configuration. It leverages VueUse's `useAsyncState` composable to handle asynchronous data loading with built-in loading states and error handling.

## Dependencies
- **Pinia**: `defineStore` for store definition
- **VueUse**: `useAsyncState` for async state management
- **Other Stores**: `useAuthStore`, `useErrorStore` for authentication context and error handling
- **API**: `getHospital` endpoint for data fetching
- **Entities**: `Hospital` entity for type safety

## State Management Architecture

The store uses VueUse's `useAsyncState` composable, which provides:
- Automatic loading state management
- Error handling integration
- Immediate execution control
- State reset capabilities

## State

### Async State (via useAsyncState)
| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `data` | `Ref<Hospital \| null>` | Hospital data object | `null` |
| `loading` | `Ref<boolean>` | Loading state for hospital data | `false` |
| `loadData` | `Function` | Function to trigger data loading | - |

## Data Structure

The hospital data includes:
- **Basic Info**: `id`, `name`
- **Specifications**: Configuration object containing:
  - `manufacturers: string[]` - Available product manufacturers
  - `categories: string[]` - Product categories
  - `tableColumns: [keyof Product, string][]` - Table column configuration

## Actions

### `loadData()`
Loads hospital data based on the current authenticated user's hospital ID.

**Flow:**
1. Gets hospital ID from auth store
2. Early return if no hospital ID (user not authenticated)
3. Clears any existing errors
4. Logs data fetching operation
5. Calls `getHospital` API with hospital ID
6. Updates state with response data

**Error Handling:**
- Automatically handled by `useAsyncState`
- Reports errors to error store with message "Failed to fetch hospital"
- Loading state automatically managed

**Logging:**
- Console logs: "🚚 fetching hospital info"

## Store Interface
The store exposes the following interface:
```typescript
{
  data: Ref<Hospital | null>,
  loading: Ref<boolean>,
  loadData: () => Promise<void>
}
```

## Usage Patterns

### Basic Data Access
```typescript
const hospitalStore = useHospitalStore()

// Access hospital data
if (hospitalStore.data) {
  console.log(`Hospital: ${hospitalStore.data.name}`)
  console.log(`Available categories: ${hospitalStore.data.spec.categories}`)
}
```

### Loading State Handling
```typescript
const hospitalStore = useHospitalStore()

// Show loading indicator
if (hospitalStore.loading) {
  // Display loading spinner
}
```

### Manual Data Loading
```typescript
const hospitalStore = useHospitalStore()

// Trigger data loading
await hospitalStore.loadData()
```

### Reactive Data Watching
```typescript
const hospitalStore = useHospitalStore()

watch(hospitalStore.data, (hospital) => {
  if (hospital) {
    // Hospital data loaded
    setupHospitalSpecificFeatures(hospital.spec)
  }
})
```

## Integration Points

### Auth Store Integration
- **Dependency**: Requires authenticated user with hospital ID
- **Trigger**: Automatically loaded after successful login
- **Context**: Uses `authStore.hospitalId` for API calls

### Error Store Integration
- **Error Reporting**: Hospital loading failures reported with "Failed to fetch hospital"
- **Error Clearing**: Clears errors before data fetching attempts

### Inventory Store Integration
- **Hospital Context**: Provides hospital ID for inventory operations
- **Configuration**: Hospital specs may influence inventory table display

## Async State Configuration

The store uses `useAsyncState` with the following configuration:

```typescript
useAsyncState(
  async () => {
    // Async function that fetches hospital data
    const hospitalId = authStore.hospitalId
    if (!hospitalId) return null
    
    errorStore.clear()
    console.log('🚚 fetching hospital info')
    return await getHospital(hospitalId)
  },
  null, // initial state
  {
    immediate: false,    // Don't execute immediately
    onError: (err: unknown) => errorStore.report(err, 'Failed to fetch hospital')
  }
)
```

## Hospital Entity Structure

Based on the Hospital entity, the data structure includes:

```typescript
type Hospital = {
  id: string          // Hospital identifier
  name: string        // Hospital name
  spec: {
    manufacturers: string[]                    // Available manufacturers
    categories: string[]                       // Product categories  
    tableColumns: [keyof Product, string][]   // Table column config
  }
}
```

## API Dependencies

| Endpoint | Purpose | Parameters | Error Handling |
|----------|---------|------------|----------------|
| `getHospital(hospitalId)` | Fetch hospital data | `hospitalId: string` | Reported to error store |

## Loading Lifecycle

1. **Initialization**: Store created with `null` data
2. **Authentication**: User logs in, hospital ID becomes available
3. **Loading Trigger**: `loadData()` called (usually by auth store)
4. **Data Fetching**: API call made with hospital ID
5. **State Update**: Data populated or error reported
6. **Ready State**: Hospital data available for use

## Error Scenarios

### No Authentication
- Hospital ID unavailable
- Function returns `null` without API call
- No error reported (expected scenario)

### API Failure
- Network or server errors
- Error reported to error store
- Loading state cleared
- Data remains `null`

### Invalid Hospital ID
- API returns error for non-existent hospital
- Handled same as API failure

## Testing Considerations

- Mock `useAuthStore` for hospital ID context
- Mock `getHospital` API endpoint
- Test loading states during async operations
- Verify error reporting integration
- Test early return when no hospital ID
- Validate data structure matches Hospital entity

## Performance Considerations

- **Lazy Loading**: Data loaded only when needed (`immediate: false`)
- **Single Request**: No automatic refetching or polling
- **Memory Efficient**: Simple state management with VueUse
- **Error Resilient**: Graceful handling of auth/network failures

## Security Considerations

- **Authorization**: Relies on auth store for hospital ID
- **Data Validation**: Hospital entity provides schema validation
- **Error Privacy**: Generic error messages prevent information leakage

## Best Practices

### Data Loading Strategy
```typescript
// Load after authentication
await authStore.login()
await hospitalStore.loadData()  // Hospital context now available
```

### Conditional Rendering
```typescript
// Wait for hospital data before showing hospital-specific UI
if (hospitalStore.data) {
  // Render hospital-specific components
}
```

### Error Handling
```typescript
// Hospital loading errors are automatically handled
// No additional error handling needed in components
```

## Potential Enhancements

### Caching Strategy
- Add cache invalidation logic
- Implement data refresh capabilities
- Consider cache expiration

### Real-time Updates
- WebSocket integration for hospital data changes
- Reactive updates to hospital specifications

### Multi-hospital Support
- Support for users with access to multiple hospitals
- Hospital switching functionality