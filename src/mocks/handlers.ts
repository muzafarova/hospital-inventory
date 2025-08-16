import { http, HttpResponse } from 'msw'
import { users, userCredentials, products, configs } from './data'
import type { InventoryData, Product, InventoryConfig } from '@/types'
import type { UserJsonValue } from '@/entities/user'

// https://mswjs.io/docs/api/http/

// In-memory state
const userSession = sessionStorage.getItem('userSession')
let currentUser: UserJsonValue | null =
  typeof userSession === 'string' ? JSON.parse(userSession) : null
let hospitalProducts: Product[] = []

export const handlers = [
  // Login endpoint
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as { username: string; password: string }

    const user = users.find((u) => u.username === username)

    if (!user) {
      return HttpResponse.json({ success: false, error: 'Invalid username' }, { status: 401 })
    }

    const isValid = userCredentials[username] === password
    if (isValid) {
      currentUser = user
      sessionStorage.setItem('userSession', JSON.stringify(currentUser))
      hospitalProducts = products.filter((p) => p.hospitalId === user.hospitalId)
      return HttpResponse.json({ success: true, data: currentUser })
    }

    return HttpResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  }),

  // Session endpoint - get current user
  http.get('/api/auth/session', () => {
    if (!currentUser) {
      return HttpResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    hospitalProducts = products.filter((p) => p.hospitalId === currentUser!.hospitalId)

    return HttpResponse.json({ success: true, data: currentUser }, { status: 200 })
  }),

  // Logout endpoint
  http.post<{ username: string }>('/api/auth/logout', () => {
    if (!currentUser) {
      return
    }
    if (currentUser) {
      currentUser = null
      hospitalProducts = []
      sessionStorage.setItem('userSession', JSON.stringify(null))
      return HttpResponse.json({ success: true }, { status: 200 })
    }
    return HttpResponse.json({ success: false }, { status: 400 })
  }),

  // Inventory endpoint
  http.get('/api/inventory', async ({ request }) => {
    const url = new URL(request.url)
    const hospitalId = url.searchParams.get('hospitalId')
    const limit = parseInt(url.searchParams.get('limit') || '100')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    const response: { success: true; data: InventoryData } = {
      success: true,
      data: {
        products: hospitalProducts.slice(offset, offset + limit),
        meta: {
          total: hospitalProducts.length,
          offset,
          limit,
        },
      },
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
    return HttpResponse.json(response)
  }),

  // Inventory remove
  http.delete('/api/inventory', async ({ request }) => {
    const { hospitalId, ids = [] } = await request.clone().json()

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    // Filter products for the hospital (in real app, this would be database filtered)
    hospitalProducts = hospitalProducts.filter((product) => !ids.includes(product.id))

    return HttpResponse.json(ids, { status: 200 })
  }),

  // Inventory config endpoint
  http.get('/api/inventory-spec', ({ request }) => {
    const url = new URL(request.url)
    const hospitalId = url.searchParams.get('hospitalId')

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    const config = configs.find((c) => c.hospitalId === hospitalId)
    if (config) {
      const response: { success: true; data: InventoryConfig } = {
        success: true,
        data: config,
      }
      return HttpResponse.json(response, { status: 200 })
    }

    return HttpResponse.json({ error: 'Hospital config not found' }, { status: 404 })
  }),
]
