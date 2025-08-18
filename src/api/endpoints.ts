import type { UserCredentials, InventoryQueryParams, InventoryConfig, Product } from '@/types'
import User, { type UserJsonValue } from '@/entities/user'

import { request, request1 } from './request'

// Auth
export async function loginUser({ username, password }: UserCredentials) {
  return await request1<UserJsonValue, User>('/api/auth/login', User.fromJson, {
    method: 'POST',
    data: { username, password },
  })
}

export async function logoutUser() {
  return await request(`/api/auth/logout`, { method: 'POST' })
}

export async function checkSession() {
  return await request1<UserJsonValue, User>('/api/auth/session', User.fromJson)
}

export type InventoryData = {
  products: Product[]
  meta: {
    total: number
    offset: number
    limit: number
  }
}
export type InventoryQueryParams = {
  hospitalId: string
  limit: number
  offset: number
}
export async function getInventory(query: InventoryQueryParams) {
  return await request1<InventoryData, InventoryData>('/api/inventory', (x) => x, { query })
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
