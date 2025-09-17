// Query Side - Read Operations
export interface ProductListQuery {
  hospitalId: string
  filters: {
    limit: number
    offset: number
    name?: string
    category?: string
    manufacturer?: string
    minQuantity?: number
    maxQuantity?: number
    expiresBefore?: string
  }
  sorting: {
    field: 'name' | 'manufacturer' | 'category' | 'quantity' | 'price' | 'expiresAt'
    direction: 'asc' | 'desc'
  }
}

export interface ProductStatsQuery {
  hospitalId: string
  filters: {
    category?: string
    manufacturer?: string
    expiresBefore?: string
  }
}

// Read Models (Optimized for display)
export interface ProductListReadModel {
  items: ProductListItem[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasNext: boolean
    hasPrevious: boolean
  }
  filters: ProductListQuery['filters']
  sorting: ProductListQuery['sorting']
}

export interface ProductListItem {
  id: string
  name: string
  manufacturer: string
  category: string
  quantity: number
  price: string
  expiresAt: string | null
  isExpiringSoon: boolean
  isLowStock: boolean
}

export interface ProductStatsReadModel {
  totalProducts: number
  totalValue: number
  lowStockCount: number
  expiringSoonCount: number
  categoryBreakdown: Array<{
    category: string
    count: number
    value: number
  }>
  manufacturerBreakdown: Array<{
    manufacturer: string
    count: number
    value: number
  }>
}

// Query Handlers
export class ProductListQueryHandler {
  constructor(private productQueryService: ProductQueryService) {}

  async handle(query: ProductListQuery): Promise<ProductListReadModel> {
    // Optimized read operation
    return await this.productQueryService.getProductList(query)
  }
}

export class ProductStatsQueryHandler {
  constructor(private productQueryService: ProductQueryService) {}

  async handle(query: ProductStatsQuery): Promise<ProductStatsReadModel> {
    // Optimized stats calculation
    return await this.productQueryService.getProductStats(query)
  }
}

// Query Service (Optimized for reads)
export class ProductQueryService {
  constructor(private productReadRepository: ProductReadRepository) {}

  async getProductList(query: ProductListQuery): Promise<ProductListReadModel> {
    // This could use a different database/optimized read model
    // that's optimized for display purposes
    return await this.productReadRepository.findProducts(query)
  }

  async getProductStats(query: ProductStatsQuery): Promise<ProductStatsReadModel> {
    // Pre-calculated stats or optimized aggregations
    return await this.productReadRepository.getProductStats(query)
  }
}