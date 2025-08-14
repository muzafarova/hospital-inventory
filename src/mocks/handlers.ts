import { http, HttpResponse } from 'msw'
import { users, userCredentials, mockProducts } from './data'
import type { User, InventoryData } from '@/types'

// Mock session storage for user authentication
const userSession = localStorage.getItem('userSession')
let currentUser: User | null = typeof userSession === 'string' ? JSON.parse(userSession) : null

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
      localStorage.setItem('userSession', JSON.stringify(currentUser))
      return HttpResponse.json({ success: true, user: currentUser })
    }

    return HttpResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  }),

  // Session endpoint - get current user
  http.get('/api/auth/session', () => {
    if (currentUser) {
      return HttpResponse.json({ success: true, user: currentUser }, { status: 200 })
    }
    return HttpResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }),

  // Logout endpoint
  http.post<{ username: string }>('/api/auth/logout', async ({ request }) => {
    if (!currentUser) {
      return
    }
    const { username } = await request.clone().json()
    if (currentUser?.username === username) {
      currentUser = null
      localStorage.setItem('userSession', JSON.stringify(null))
      return HttpResponse.json({ success: true }, { status: 200 })
    }
    return HttpResponse.json({ success: false }, { status: 400 })
  }),

  // Inventory endpoint
  http.get('/api/inventory', ({ request }) => {
    const url = new URL(request.url)
    const hospitalId = url.searchParams.get('hospitalId')
    const limit = parseInt(url.searchParams.get('limit') || '100')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    // Filter products for the hospital (in real app, this would be database filtered)
    const hospitalProducts = mockProducts.slice(offset, offset + limit)

    const response: { success: true; data: InventoryData } = {
      success: true,
      data: {
        products: hospitalProducts,
        meta: {
          total: mockProducts.length,
          offset,
          limit,
        },
      },
    }

    return HttpResponse.json(response)
  }),
]
