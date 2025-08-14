export type Account = {
  username: string
  password: string
}

export interface User {
  username: string
  hospitalId: string
}

export interface Product {
  id: string
  name: string
  manufacturer: string
  category: string
  quantity: number
  price: number
  expiresAt: number
}

export type ProductColumnKey =
  | 'name'
  | 'manufacturer'
  | 'category'
  | 'quantity'
  | 'price'
  | 'expiresAt'

export type NotificationType = 'warning' | 'error' | 'success' | 'info'

export type InventoryData = {
  products: Product[]
  meta: {
    total: number
    offset: number
    limit: number
  }
}
