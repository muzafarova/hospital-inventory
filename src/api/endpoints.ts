import User, { type UserJsonValue } from '@/entities/user'
import ProductList, { type ProductListJsonValue } from '@/collections/productList'
import Hospital, { type HospitalJsonValue } from '@/entities/hospital'

import { request } from './request'

// Auth
export async function loginUser({ username, password }: { username: string; password: string }) {
  return await request<UserJsonValue, User>('/api/auth/login', User.fromJson, {
    method: 'POST',
    data: { username, password },
  })
}

export async function logoutUser() {
  return await request(`/api/auth/logout`, () => null, { method: 'POST' })
}

export async function checkSession() {
  return await request<UserJsonValue, User>('/api/auth/session', User.fromJson)
}

export async function getInventory(query: { hospitalId: string; limit: number; offset: number }) {
  return await request<ProductListJsonValue, ProductList>('/api/inventory', ProductList.fromJson, {
    query,
  })
}

export async function getHospital(hospitalId: string) {
  return await request<HospitalJsonValue, Hospital>(
    `/api/hospital/${hospitalId}`,
    Hospital.fromJson,
    {
      query: { hospitalId },
    },
  )
}

export async function deleteInventory(hospitalId: string, ids: string[]) {
  return await request('/api/inventory', () => null, {
    method: 'DELETE',
    data: { hospitalId, ids },
  })
}
