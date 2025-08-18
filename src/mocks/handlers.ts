import { http, delay, HttpResponse } from 'msw'
import { users, userCredentials, products, hospitals } from './data'
import type { UserJsonValue } from '@/entities/user'
import { type HospitalJsonValue } from '@/entities/hospital'
import type { ProductJsonValue } from '@/entities/product'

// https://mswjs.io/docs/api/http/

// Persistent state (imitates user session on the backend)
const userSession = localStorage.getItem('userSession')

// In-memory state (imitates state on the backend)
let currentUser: UserJsonValue | null =
  typeof userSession === 'string' ? JSON.parse(userSession) : null
let currentHospitalProducts: ProductJsonValue[] = []
let currentHospital: HospitalJsonValue | null = null

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
      currentHospitalProducts = products.filter((p) => p.hospitalId === user.hospitalId)
      return HttpResponse.json({ data: currentUser })
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }),

  // Session endpoint - get current user
  http.get('/api/auth/session', () => {
    if (!currentUser) {
      return HttpResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    currentHospitalProducts = products.filter((p) => p.hospitalId === currentUser!.hospitalId)

    return HttpResponse.json({ data: currentUser }, { status: 200 })
  }),

  // Logout endpoint
  http.post<{ username: string }>('/api/auth/logout', () => {
    if (!currentUser) {
      return
    }
    if (currentUser) {
      currentUser = null
      currentHospitalProducts = []
      localStorage.setItem('userSession', JSON.stringify(null))
      return HttpResponse.json({ data: null }, { status: 200 })
    }
    return HttpResponse.json({ error: 'Failed to togout' }, { status: 400 })
  }),

  // Hospital endpoint
  http.get<{ hospitalId: string }>('/api/hospital/:hospitalId', ({ params }) => {
    const { hospitalId } = params

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    currentHospital = hospitals.find((c) => c.id === hospitalId) || null
    if (currentHospital) {
      return HttpResponse.json({ data: currentHospital }, { status: 200 })
    }

    return HttpResponse.json({ error: 'Hospital not found' }, { status: 404 })
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
          items: currentHospitalProducts.slice(offset, offset + limit),
          meta: {
            total: currentHospitalProducts.length,
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
    currentHospitalProducts = currentHospitalProducts.filter((product) => !ids.includes(product.id))

    await delay(300)
    return HttpResponse.json(ids, { status: 200 })
  }),
]
