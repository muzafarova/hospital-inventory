import type { InventoryConfig } from '@/types'
import User, { type UserJsonValue } from '@/entities/user'
import Product, { type ListJsonValue } from '@/entities/product'

import { request, request1 } from './request'

// Auth
export async function loginUser({ username, password }: { username: string; password: string }) {
  return await request1<UserJsonValue, User>('/api/auth/login', User.fromJson, {
    method: 'POST',
    data: { username, password },
  })
}

export async function logoutUser() {
  return await request1(`/api/auth/logout`, () => null, { method: 'POST' })
}

export async function checkSession() {
  return await request1<UserJsonValue, User>('/api/auth/session', User.fromJson)
}

// TODO review list types
export async function getInventory(query: { hospitalId: string; limit: number; offset: number }) {
  return await request1<
    ListJsonValue,
    {
      products: Product[]
      meta: {
        total: number
        offset: number
        limit: number
      }
    }
  >('/api/inventory', Product.fromListJson, {
    query,
  })
}

export async function getInventoryConfig(hospitalId: string) {
  return await request<
    | {
        success: true
        data: InventoryConfig
      }
    | { success: false; error: string }
  >('/api/inventory-spec', { query: { hospitalId } })
}

export async function deleteInventory(hospitalId: string, ids: string[]) {
  return await request<void>('/api/inventory', { method: 'DELETE', data: { hospitalId, ids } })
}
