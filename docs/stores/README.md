# Store Architecture Documentation

## Overview
This application uses Pinia for state management with a modular store architecture. The stores are designed to handle different aspects of the application: authentication, error handling, hospital context, and inventory management.

## Store Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Store    │────│ Hospital Store  │    │  Error Store    │
│                 │    │                 │    │                 │
│ - User session  │    │ - Hospital data │    │ - Notifications │
│ - Login/logout  │    │ - Configuration │    │ - Error display │
│ - Authentication│    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Inventory Store │
                    │                 │
                    │ - Product CRUD  │
                    │ - Pagination    │
                    │ - Bulk ops      │
                    └─────────────────┘
```

## Store Dependencies

### Dependency Graph
```
Auth Store
├── Error Store (error reporting)
├── Hospital Store (data loading trigger)
└── Vue Router (navigation)

Hospital Store
├── Auth Store (hospital ID context)
├── Error Store (error reporting)
└── VueUse (async state management)

Inventory Store
├── Auth Store (hospital ID context)
├── Error Store (error reporting)
└── VueUse (async state management)

Error Store
└── (no dependencies - base utility)
```

### Circular Dependencies
The stores have a managed circular dependency pattern:
- **Auth Store** → **Hospital Store**: Triggers hospital data loading
- **Hospital Store** → **Auth Store**: Reads hospital ID from auth context

This is safe because:
1. Hospital store only reads from auth store (reactive dependency)
2. Auth store calls hospital store methods (action dependency)
3. No infinite loops due to careful state management

## Store Responsibilities

### Auth Store (`useAuthStore`)
**Primary Responsibility**: User authentication and session management

**Key Features:**
- Login/logout functionality
- Session validation and restoration
- User state management
- Navigation after auth operations
- Integration with hospital data loading

**State:**
- User credentials and data
- Authentication status
- Loading states

### Error Store (`useErrorStore`)
**Primary Responsibility**: Centralized error handling and user notifications

**Key Features:**
- Error reporting with user-friendly messages
- Notification queue management
- Console logging for debugging
- Simple clear functionality

**State:**
- Array of notification messages

### Hospital Store (`useHospitalStore`)
**Primary Responsibility**: Hospital-specific data and configuration management

**Key Features:**
- Hospital data loading based on authenticated user
- Configuration data for inventory operations
- Async state management with VueUse
- Error handling integration

**State:**
- Hospital information and specifications
- Loading states

### Inventory Store (`useInventoryStore`)
**Primary Responsibility**: Product inventory management and CRUD operations

**Key Features:**
- Product listing with pagination and search
- Product creation, updating, and deletion
- Bulk operations and selection management
- Multiple async states for different operations
- Comprehensive error handling

**State:**
- Product lists and metadata
- Query parameters and selection
- Multiple loading states for different operations

## Data Flow Patterns

### Authentication Flow
```
1. User enters credentials → Auth Store
2. Auth Store calls login API
3. On success: User data stored
4. Auth Store triggers Hospital Store loading
5. Hospital Store loads hospital-specific data
6. Navigation to inventory page
7. Inventory operations now have hospital context
```

### Error Handling Flow
```
1. Any store operation fails
2. Error reported to Error Store with user message
3. Technical error logged to console
4. User notification added to queue
5. UI components display notifications
6. User can dismiss or errors auto-clear
```

### Inventory Operations Flow
```
1. User initiates inventory operation
2. Inventory Store checks auth context (hospital ID)
3. API call made with hospital context
4. Loading state managed automatically
5. On success: Data updated, list refreshed
6. On error: Error reported to Error Store
7. UI updates reactively based on state changes
```

## State Management Patterns

### Async State Management
Most stores use VueUse's `useAsyncState` for consistent async operation handling:

**Benefits:**
- Automatic loading state management
- Built-in error handling
- Configurable execution patterns
- State reset capabilities

**Pattern:**
```typescript
const { state, isLoading, executeImmediate } = useAsyncState(
  async (params) => {
    // Async operation
    return await apiCall(params)
  },
  initialValue,
  {
    immediate: false,
    onError: (err) => errorStore.report(err, 'User-friendly message'),
    onSuccess: () => { /* Optional success handling */ }
  }
)
```

### Reactive Dependencies
Stores use Vue's reactivity system for inter-store communication:

```typescript
// Hospital store reacts to auth store changes
const hospitalId = authStore.hospitalId // Reactive dependency
```

### Error Propagation
Consistent error handling across all stores:

```typescript
try {
  await operation()
} catch (err) {
  errorStore.report(err, 'User-friendly error message')
}
```

## API Integration

### Centralized API Layer
All stores use the same API layer (`/api/endpoints.ts`):
- Consistent request handling
- Type safety with entity validation
- Centralized error handling
- Request/response transformation

### Hospital Context
Most API operations require hospital context:
```typescript
// Pattern used across stores
const hospitalId = authStore.hospitalId
if (!hospitalId) return // Early return if no context

await apiCall(hospitalId, data)
```

## Testing Strategy

### Unit Testing Approach
Each store should be tested independently:

```typescript
// Mock dependencies
const mockAuthStore = { hospitalId: 'test-hospital' }
const mockErrorStore = { report: vi.fn(), clear: vi.fn() }

// Test store in isolation
const store = useInventoryStore()
// Test store methods and state changes
```

### Integration Testing
Test store interactions:
- Auth flow triggering hospital data loading
- Error propagation across stores
- Data consistency after operations

### Mock Strategies
- Mock API endpoints for consistent testing
- Mock router for navigation testing
- Mock VueUse composables for async state testing

## Performance Considerations

### Loading States
Multiple granular loading states prevent UI blocking:
- `auth.loading` - Authentication operations
- `hospital.loading` - Hospital data loading
- `inventory.loading` - Product listing
- `inventory.adding` - Product creation
- `inventory.editing` - Product updates
- `inventory.removing` - Product deletion

### Data Caching
- **Auth Store**: User data cached until logout
- **Hospital Store**: Hospital data cached until session ends
- **Inventory Store**: No automatic caching, fresh data on each load
- **Error Store**: Transient data, manually cleared

### Memory Management
- Stores automatically clean up on user logout
- Large datasets (inventory) use pagination
- Error notifications accumulate but can be cleared

## Security Considerations

### Authentication Context
- All sensitive operations require authenticated user
- Hospital ID provides operation context
- No cross-hospital data access possible

### Error Handling
- User-friendly error messages prevent information disclosure
- Technical details logged but not exposed
- No sensitive data in error states

### Data Validation
- Entity schemas validate all data
- Type safety prevents malformed data
- API layer provides additional validation

## Best Practices

### Store Usage
```typescript
// ✅ Good: Use stores in setup function or composables
const authStore = useAuthStore()
const inventoryStore = useInventoryStore()

// ✅ Good: Check loading states
if (inventoryStore.loading) {
  // Show loading indicator
}

// ✅ Good: Handle errors automatically
await inventoryStore.addProduct(productData)
// Errors automatically reported to error store
```

### Error Handling
```typescript
// ✅ Good: Let stores handle errors
await store.operation() // Errors reported automatically

// ❌ Avoid: Duplicate error handling
try {
  await store.operation()
} catch (err) {
  // Store already handles this
}
```

### State Access
```typescript
// ✅ Good: Use computed properties for derived state
const isAuthenticated = computed(() => authStore.isAuthenticated)

// ✅ Good: Use reactive data directly
watch(inventoryStore.productsList, (products) => {
  // React to changes
})
```

## Migration and Scaling

### Adding New Stores
When adding new stores, follow the established patterns:

1. **Use Pinia's `defineStore`**
2. **Integrate with Error Store** for consistent error handling
3. **Use Auth Store context** if operations require authentication
4. **Implement VueUse async states** for async operations
5. **Follow naming conventions** (`useXxxStore`)

### Extending Existing Stores
- Add new actions following existing patterns
- Maintain backward compatibility
- Update documentation
- Add tests for new functionality

### Store Splitting
If stores become too large, consider splitting by:
- **Feature boundaries** (e.g., separate user profile from auth)
- **Data domains** (e.g., separate reports from inventory)
- **Operation types** (e.g., separate admin operations)

## Troubleshooting

### Common Issues

#### "Hospital ID not available"
- **Cause**: Operation attempted before authentication
- **Solution**: Ensure user is authenticated before inventory operations
- **Prevention**: Check `authStore.isAuthenticated` before operations

#### "Loading states not updating"
- **Cause**: Async state configuration issues
- **Solution**: Verify `useAsyncState` configuration
- **Prevention**: Follow established async state patterns

#### "Errors not displaying"
- **Cause**: Error store not integrated or cleared too quickly
- **Solution**: Ensure error reporting and check notification display logic
- **Prevention**: Test error flows during development

#### "Circular dependency warnings"
- **Cause**: Improper store imports or usage
- **Solution**: Review dependency graph and usage patterns
- **Prevention**: Follow established dependency patterns

### Debugging Tools

#### Vue DevTools
- Monitor store state changes
- Track reactive dependencies
- Debug async operations

#### Console Logging
- All stores include operation logging
- Error details logged for debugging
- Use browser dev tools for detailed inspection

#### Network Tab
- Monitor API calls and responses
- Verify request/response data
- Check authentication headers

## Future Enhancements

### Potential Improvements

#### Real-time Updates
- WebSocket integration for live data updates
- Optimistic UI updates
- Conflict resolution for concurrent operations

#### Offline Support
- Service worker integration
- Local data caching
- Sync when online

#### Advanced Caching
- Intelligent cache invalidation
- Background data refresh
- Cross-tab state synchronization

#### Analytics
- User interaction tracking
- Performance monitoring
- Error rate analysis

#### Accessibility
- Screen reader support for loading states
- Keyboard navigation for bulk operations
- High contrast mode support

## Conclusion

The store architecture provides a solid foundation for the application with:
- **Clear separation of concerns** between different data domains
- **Consistent patterns** for async operations and error handling
- **Type safety** with TypeScript and entity validation
- **Reactive integration** with Vue's reactivity system
- **Scalable structure** for future enhancements

The modular design allows for easy testing, maintenance, and extension while providing a robust foundation for complex inventory management operations.