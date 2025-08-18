import { http, delay, HttpResponse } from 'msw'
import { users, userCredentials, products, configs } from './data'
import type { InventoryConfig } from '@/types'
import type { UserJsonValue } from '@/entities/user'
import type { ProductJsonValue } from '@/entities/product'

// https://mswjs.io/docs/api/http/

// In-memory state
const userSession = localStorage.getItem('userSession')
let currentUser: UserJsonValue | null =
  typeof userSession === 'string' ? JSON.parse(userSession) : null
let hospitalProducts: ProductJsonValue[] = []

export const handlers = [
  // Login endpoint
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as { username: string; password: string }

    const user = users.find((u) => u.username === username)

    if (!user) {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = userCredentials[username] === password
    if (isValid) {
      currentUser = user
      localStorage.setItem('userSession', JSON.stringify(currentUser))
      hospitalProducts = products.filter((p) => p.hospitalId === user.hospitalId)
      return HttpResponse.json({ data: currentUser })
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }),

  // Session endpoint - get current user
  http.get('/api/auth/session', () => {
    if (!currentUser) {
      return HttpResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    hospitalProducts = products.filter((p) => p.hospitalId === currentUser!.hospitalId)

    return HttpResponse.json({ data: currentUser }, { status: 200 })
  }),

  // Logout endpoint
  http.post<{ username: string }>('/api/auth/logout', () => {
    if (!currentUser) {
      return
    }
    if (currentUser) {
      currentUser = null
      hospitalProducts = []
      localStorage.setItem('userSession', JSON.stringify(null))
      return HttpResponse.json({ data: null }, { status: 200 })
    }
    return HttpResponse.json({ error: 'Failed to togout' }, { status: 400 })
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

    await delay(1000)
    return HttpResponse.json(
      {
        data: {
          products: hospitalProducts.slice(offset, offset + limit),
          meta: {
            total: hospitalProducts.length,
            offset,
            limit,
          },
        },
      },
      { status: 200 },
    )
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
