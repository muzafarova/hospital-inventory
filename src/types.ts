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
}
