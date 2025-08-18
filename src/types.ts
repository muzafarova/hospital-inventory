export type UserCredentials = {
  username: string
  password: string
}

export interface Product {
  id: string
  hospitalId: string
  name: string
  manufacturer: string
  category: string
  quantity: number
  price: string
  expiresAt: number
}

export type ProductColumnKey =
  | 'hospitalId'
  | 'name'
  | 'manufacturer'
  | 'category'
  | 'quantity'
  | 'price'
  | 'expiresAt'

export type InventoryConfig = {
  hospitalId: string
  manufacturers: string[]
  categories: string[]
  tableColumns: [ProductColumnKey, string][]
}
