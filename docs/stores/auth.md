# Auth Store Documentation

## Overview
The `useAuthStore` is a Pinia store responsible for managing user authentication, session handling, and login/logout functionality. It serves as the central authentication state management for the application.

## Dependencies
- **Vue**: `ref`, `computed` for reactive state management
- **Vue Router**: `useRouter` for navigation
- **Pinia**: `defineStore` for store definition
- **Entities**: `User` entity for type safety
- **Other Stores**: `useErrorStore`, `useHospitalStore` for error handling and hospital data loading
- **API**: `loginUser`, `logoutUser`, `checkSession` endpoints

## State

### Reactive State
| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `credentials` | `ref<{username: string, password: string}>` | User login credentials | `{username: '', password: ''}` |
| `user` | `ref<User \| null>` | Current authenticated user | `null` |
| `loading` | `ref<boolean>` | Loading state for auth operations | `false` |

### Computed Properties
| Property | Type | Description |
|----------|------|-------------|
| `isAuthenticated` | `ComputedRef<boolean>` | Whether user is currently authenticated |
| `hospitalId` | `ComputedRef<string \| undefined>` | Current user's hospital ID |

## Actions

### `login()`
Authenticates user with provided credentials.

**Flow:**
1. Sets loading state to `true`
2. Clears any existing errors
3. Calls `loginUser` API with credentials
4. Sets user data on successful authentication
5. Loads hospital data via `hospitalStore.loadData()`
6. Redirects to inventory page
7. Handles errors via error store

**Error Handling:** Reports authentication failures to error store with message "Failed to login"

### `logout()`
Logs out the current user and cleans up session.

**Flow:**
1. Checks if user exists (early return if not)
2. Calls `logoutUser` API
3. Clears user state
4. Redirects to login page
5. Handles errors via error store

**Error Handling:** Reports logout failures to error store with message "Failed to logout"

**Note:** There's a commented loading state management in this method that appears to be intentionally disabled.

### `checkAuth()`
Validates existing session and restores user state.

**Flow:**
1. Sets loading state to `true`
2. Calls `checkSession` API
3. Sets user data if session is valid
4. Loads hospital data via `hospitalStore.loadData()`
5. Handles session validation failures silently

**Error Handling:** 
- Logs warning "Session not found" for invalid sessions
- Sets user to `null` on failure
- Does not report to error store (silent failure)

**Bug Note:** The final loading state is incorrectly set to `true` instead of `false` (line 68).

## Store Interface
The store exposes the following interface:
```typescript
{
  credentials: Ref<{username: string, password: string}>,
  user: Ref<User | null>,
  loading: Ref<boolean>,
  isAuthenticated: ComputedRef<boolean>,
  hospitalId: ComputedRef<string | undefined>,
  login: () => Promise<void>,
  logout: () => Promise<void>,
  checkAuth: () => Promise<void>
}
```

## Usage Patterns

### Basic Authentication Check
```typescript
const authStore = useAuthStore()

if (authStore.isAuthenticated) {
  // User is logged in
  console.log(`Welcome ${authStore.user.name}`)
}
```

### Login Flow
```typescript
const authStore = useAuthStore()

authStore.credentials.username = 'user@example.com'
authStore.credentials.password = 'password123'
await authStore.login()
```

### Session Restoration
```typescript
const authStore = useAuthStore()

// Check for existing session on app initialization
await authStore.checkAuth()
```

## Integration Points

### Error Store Integration
- All authentication operations report errors to the error store
- Login and logout failures are displayed to users
- Session check failures are handled silently

### Hospital Store Integration
- Successful login triggers hospital data loading
- Session restoration also loads hospital data
- Ensures hospital context is available after authentication

### Router Integration
- Successful login redirects to inventory page
- Logout redirects to login page
- Uses Vue Router's programmatic navigation

## Known Issues

1. **Loading State Bug**: In `checkAuth()`, the loading state is set to `true` at the end instead of `false` (line 68)
2. **Commented Code**: Logout method has commented loading state management that may need cleanup
3. **Error Consistency**: Session check doesn't report to error store while other operations do

## Security Considerations

- Credentials are stored in reactive state (consider clearing after login)
- Session validation happens automatically
- User state is properly cleared on logout
- No sensitive data persistence in store state

## API Dependencies

| Endpoint | Purpose | Error Handling |
|----------|---------|----------------|
| `loginUser(credentials)` | Authenticate user | Reported to error store |
| `logoutUser()` | End user session | Reported to error store |
| `checkSession()` | Validate existing session | Silent failure |

## Testing Considerations

- Mock router navigation for login/logout flows
- Test error store integration
- Verify hospital store loading after authentication
- Test loading states during async operations
- Validate computed properties behavior