# Inventory Store Documentation

## Overview
The `useInventoryStore` is the most complex Pinia store in the application, responsible for managing product inventory operations including listing, creating, updating, and deleting products. It uses multiple `useAsyncState` composables to handle different asynchronous operations with their own loading states and error handling.

## Dependencies
- **Vue**: `ref`, `computed` for reactive state management
- **Pinia**: `defineStore` for store definition
- **VueUse**: `useAsyncState` for async state management
- **Other Stores**: `useAuthStore`, `useErrorStore` for authentication context and error handling
- **API**: Multiple inventory endpoints (`getProducts`, `createProduct`, `updateProduct`, `deleteProducts`)
- **Entities**: `Product` entity and `ProductList` collection
- **Types**: `NewProductSpec` type for product creation

## State Management Architecture

The store uses multiple `useAsyncState` composables for different operations:
- **Product Listing**: Loading and displaying products with pagination
- **Product Removal**: Single and bulk product deletion
- **Product Creation**: Adding new products
- **Product Editing**: Updating existing products

Each operation has its own loading state and error handling.

## State

### Query State
| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `productsQuery` | `ref<{limit: number, offset: number, name: string}>` | Current query parameters for product listing | `{limit: 100, offset: 0, name: ''}` |
| `productsSelection` | `ref<string[]>` | Array of selected product IDs for bulk operations | `[]` |

### Async States (via useAsyncState)
| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `productsList` | `Ref<ProductList \| null>` | Current product list with metadata | `null` |
| `loading` | `Ref<boolean>` | Loading state for product listing | `false` |
| `removing` | `Ref<boolean>` | Loading state for product removal | `false` |
| `adding` | `Ref<boolean>` | Loading state for product creation | `false` |
| `editing` | `Ref<boolean>` | Loading state for product updates | `false` |

### Computed Properties
| Property | Type | Description |
|----------|------|-------------|
| `productStats` | `ComputedRef<string>` | Formatted pagination statistics string |

## Data Structures

### ProductList Structure
```typescript
type ProductList = {
  items: Product[]     // Array of product items
  meta: {
    total: number      // Total number of products
    limit: number      // Items per page
    offset: number     // Current page offset
  }
}
```

### Product Structure
```typescript
type Product = {
  id: string
  hospitalId: string
  createdAt: string
  updatedAt: string
  name: string
  manufacturer: string
  category: string
  quantity: number
  price: string
  expiresAt: string | null
}
```

### NewProductSpec
```typescript
type NewProductSpec = Omit<Product, 'hospitalId' | 'id' | 'createdAt' | 'updatedAt'>
```

## Async State Configurations

### Product Listing
```typescript
useAsyncState(
  async () => {
    const hospitalId = authStore.hospitalId
    if (!hospitalId) return null
    
    errorStore.clear()
    console.log('🚚 fetching inventory', { ...productsQuery.value })
    return await getProducts(hospitalId, {
      offset: productsQuery.value.offset,
      limit: productsQuery.value.limit,
      name: productsQuery.value.name,
    })
  },
  null,
  {
    immediate: false,
    resetOnExecute: false,  // Preserve previous data while loading
    onError: (err: unknown) => errorStore.report(err, 'Failed to load inventory')
  }
)
```

### Product Removal
```typescript
useAsyncState(
  async (ids: string[]) => {
    const hospitalId = authStore.hospitalId
    if (!hospitalId) return
    await deleteProducts(hospitalId, ids)
  },
  null,
  {
    immediate: false,
    onError: (err: unknown) => errorStore.report(err, 'Failed to remove inventory'),
    onSuccess: async () => await listProducts()  // Refresh list after removal
  }
)
```

### Product Creation
```typescript
useAsyncState(
  async (data: NewProductSpec) => {
    const hospitalId = authStore.hospitalId
    if (!hospitalId) return
    await createProduct(hospitalId, data)
  },
  null,
  {
    immediate: false,
    onError: (err: unknown) => errorStore.report(err, 'Failed to add inventory item'),
    onSuccess: async () => await listProducts()  // Refresh list after creation
  }
)
```

### Product Editing
```typescript
useAsyncState(
  async (data: Product) => {
    const hospitalId = authStore.hospitalId
    if (!hospitalId) return
    await updateProduct(hospitalId, data)
  },
  null,
  {
    immediate: false,
    onError: (err: unknown) => errorStore.report(err, 'Failed to update inventory item'),
    onSuccess: async () => await listProducts()  // Refresh list after update
  }
)
```

## Actions

### `loadProducts({limit?, offset?, name?})`
Loads products with specified query parameters.

**Parameters:**
- `limit?: number` - Number of items per page (default: 100)
- `offset?: number` - Page offset (default: 0)  
- `name?: string` - Product name filter (default: '')

**Flow:**
1. Updates `productsQuery` state with new parameters
2. Triggers product list loading via `listProducts()`

**Usage:**
```typescript
// Load first page
await inventoryStore.loadProducts({ limit: 50, offset: 0 })

// Search by name
await inventoryStore.loadProducts({ name: 'aspirin' })

// Pagination
await inventoryStore.loadProducts({ offset: 100 })
```

### `removeProduct(id: string)`
Removes a single product by ID.

**Parameters:**
- `id: string` - Product ID to remove

**Flow:**
1. Validates ID exists
2. Logs removal operation
3. Calls bulk removal with single ID array
4. Automatically refreshes product list on success

**Logging:**
- Console logs: "🚚 removing inventory item {id}"

### `bulkRemoveProducts(ids: string[])`
Removes multiple products by their IDs.

**Parameters:**
- `ids: string[]` - Array of product IDs to remove

**Flow:**
1. Validates IDs array
2. Logs bulk removal operation  
3. Calls removal async state with ID array
4. Automatically refreshes product list on success

**Logging:**
- Console logs: "🚚 mass-removing inventory [...ids]"

### `addProduct(data: NewProductSpec)`
Creates a new product.

**Parameters:**
- `data: NewProductSpec` - Product data without system fields

**Flow:**
1. Calls creation async state with product data
2. Automatically refreshes product list on success
3. Reports errors to error store

### `editProduct(data: Product)`
Updates an existing product.

**Parameters:**
- `data: Product` - Complete product data including ID

**Flow:**
1. Calls editing async state with product data
2. Automatically refreshes product list on success
3. Reports errors to error store

### `clear()`
Clears the current product list.

**Usage:**
- Called when user logs out
- Resets store state to initial values

### `updateSelection(selected: string[])`
Updates the current product selection for bulk operations.

**Parameters:**
- `selected: string[]` - Array of selected product IDs

**Usage:**
- Typically called from table/list components
- Used for bulk removal operations

## Computed Properties

### `productStats`
Generates a formatted string showing pagination information.

**Format:** `"{start} - {end} of {total}"`
**Example:** `"1 - 20 of 1,250"`

**Logic:**
```typescript
productsList.value
  ? `${productsList.value.meta.limit * productsList.value.meta.offset + 1} -
      ${productsList.value.items.length} of
      ${productsList.value.meta.total.toLocaleString()}`
  : ''
```

## Store Interface
The store exposes the following interface:
```typescript
{
  // Loading states
  loading: Ref<boolean>,
  removing: Ref<boolean>,
  adding: Ref<boolean>,
  editing: Ref<boolean>,
  
  // Data
  productsList: Ref<ProductList | null>,
  productStats: ComputedRef<string>,
  productsSelection: Ref<string[]>,
  
  // Actions
  loadProducts: (params: {limit?: number, offset?: number, name?: string}) => Promise<void>,
  addProduct: (data: NewProductSpec) => Promise<void>,
  editProduct: (data: Product) => Promise<void>,
  removeProduct: (id: string) => Promise<void>,
  bulkRemoveProducts: (ids: string[]) => Promise<void>,
  updateSelection: (selected: string[]) => void,
  clear: () => void
}
```

## Usage Patterns

### Product Listing with Pagination
```typescript
const inventoryStore = useInventoryStore()

// Load first page
await inventoryStore.loadProducts({ limit: 20, offset: 0 })

// Show loading state
if (inventoryStore.loading) {
  // Display loading spinner
}

// Display products
if (inventoryStore.productsList) {
  inventoryStore.productsList.items.forEach(product => {
    console.log(`${product.name} - ${product.quantity} units`)
  })
}

// Show pagination info
console.log(inventoryStore.productStats) // "1 - 20 of 150"
```

### Product Search
```typescript
const inventoryStore = useInventoryStore()

// Search products by name
await inventoryStore.loadProducts({ name: 'aspirin' })
```

### Product Creation
```typescript
const inventoryStore = useInventoryStore()

const newProduct = {
  name: 'New Medicine',
  manufacturer: 'PharmaCorp',
  category: 'Medication',
  quantity: 100,
  price: '29.99',
  expiresAt: '2024-12-31'
}

await inventoryStore.addProduct(newProduct)

// Check loading state
if (inventoryStore.adding) {
  // Show creation progress
}
```

### Product Updates
```typescript
const inventoryStore = useInventoryStore()

const updatedProduct = {
  ...existingProduct,
  quantity: 75, // Update quantity
  price: '24.99' // Update price
}

await inventoryStore.editProduct(updatedProduct)
```

### Bulk Operations
```typescript
const inventoryStore = useInventoryStore()

// Select products
inventoryStore.updateSelection(['id1', 'id2', 'id3'])

// Bulk remove selected products
await inventoryStore.bulkRemoveProducts(inventoryStore.productsSelection)

// Check removal state
if (inventoryStore.removing) {
  // Show removal progress
}
```

## Integration Points

### Auth Store Integration
- **Dependency**: Requires authenticated user with hospital ID
- **Context**: Uses `authStore.hospitalId` for all API calls
- **Authorization**: All operations check for hospital ID availability

### Error Store Integration
- **Error Reporting**: All operations report failures to error store
- **Error Messages**:
  - Loading: "Failed to load inventory"
  - Removal: "Failed to remove inventory"
  - Creation: "Failed to add inventory item"
  - Updates: "Failed to update inventory item"
- **Error Clearing**: Clears errors before loading operations

### UI Component Integration
- **Loading States**: Multiple loading indicators for different operations
- **Data Binding**: Reactive product list for table/grid components
- **Selection Management**: Product selection state for bulk operations
- **Pagination**: Built-in pagination support with statistics

## API Dependencies

| Endpoint | Purpose | Parameters | Error Handling |
|----------|---------|------------|----------------|
| `getProducts(hospitalId, query)` | Load product list | `hospitalId: string`, `query: {limit, offset, name}` | "Failed to load inventory" |
| `createProduct(hospitalId, data)` | Create new product | `hospitalId: string`, `data: NewProductSpec` | "Failed to add inventory item" |
| `updateProduct(hospitalId, data)` | Update existing product | `hospitalId: string`, `data: Product` | "Failed to update inventory item" |
| `deleteProducts(hospitalId, ids)` | Delete products | `hospitalId: string`, `ids: string[]` | "Failed to remove inventory" |

## Error Scenarios

### Authentication Issues
- No hospital ID available
- Operations return early without API calls
- No error reported (expected scenario)

### Network Failures
- API call failures reported to error store
- Loading states properly cleared
- Data remains in previous state

### Validation Errors
- Server-side validation failures
- Error messages displayed to user
- Form state preserved for correction

## Security Considerations

### Authorization
- All operations require valid hospital ID
- Hospital context prevents cross-hospital access
- User authentication validated via auth store

### Data Validation
- Product entity provides schema validation
- API-level validation for data integrity
- Type safety with TypeScript interfaces

### Error Privacy
- Generic error messages prevent information disclosure
- Detailed errors logged but not exposed to UI
- No sensitive data in error messages

## Best Practices

### Loading State Management
```typescript
// Show specific loading states
if (inventoryStore.adding) {
  // Show "Creating product..." message
}
if (inventoryStore.editing) {
  // Show "Updating product..." message  
}
```

### Error Handling
```typescript
// Errors are automatically handled by the store
// Components can focus on UI logic
await inventoryStore.addProduct(productData)
// No need for try/catch - errors reported to error store
```

### Pagination Implementation
```typescript
// Implement pagination controls
const currentPage = Math.floor(inventoryStore.productsQuery.offset / inventoryStore.productsQuery.limit)
const totalPages = Math.ceil((inventoryStore.productsList?.meta.total || 0) / inventoryStore.productsQuery.limit)

// Load next page
await inventoryStore.loadProducts({
  offset: (currentPage + 1) * inventoryStore.productsQuery.limit
})
```

### Selection Management
```typescript
// Handle selection changes in table component
const handleSelectionChange = (selectedIds: string[]) => {
  inventoryStore.updateSelection(selectedIds)
}

// Enable bulk operations
const canBulkRemove = inventoryStore.productsSelection.length > 0
```

## Potential Enhancements

### Real-time Updates
- WebSocket integration for live inventory updates
- Conflict resolution for concurrent edits
- Real-time stock level monitoring

### Advanced Filtering
- Multi-field search capabilities
- Date range filtering for expiration dates
- Category and manufacturer filters
- Price range filtering

### Bulk Operations
- Bulk edit capabilities
- Import/export functionality
- Batch price updates
- Mass category assignments

### Caching Improvements
- Intelligent cache invalidation
- Optimistic updates for better UX
- Background data synchronization
- Offline capability with sync

### Analytics Integration
- Inventory tracking and reporting
- Low stock alerts
- Usage analytics
- Trend analysis