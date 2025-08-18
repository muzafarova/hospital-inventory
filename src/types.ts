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
