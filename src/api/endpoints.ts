import type { Account, User, InventoryData } from '@/types'
import { request } from './request'

export async function loginUser({ username, password }: Account) {
  return await request<{ success: true; user: User } | { success: false; error: string }>(
    '/api/auth/login',
    { method: 'POST', data: { username, password } },
  )
}

export async function logoutUser({ username }: { username: string }) {
  return await request(`/api/auth/logout`, { method: 'POST', data: { username } })
}

export async function checkSession() {
  return await request<{ success: true; user: User } | { success: false; error: string }>(
    '/api/auth/session',
  )
}

type InventoryQueryParams = {
  hospitalId: string
  limit: number
  offset: number
}
export async function getInventory(query: InventoryQueryParams) {
  return await request<
    | {
        success: true
        data: InventoryData
      }
    | { success: false; error: string }
  >('/api/inventory', { query })
}
