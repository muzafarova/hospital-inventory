import { http, delay, HttpResponse } from 'msw'
import * as z from 'zod'

import { users, userCredentials, products, hospitals } from './data'
import type { UserJsonValue } from '@/entities/user'
import type { HospitalJsonValue } from '@/entities/hospital'
import type { ProductJsonValue } from '@/entities/product'
import { generateUuid } from './data'

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
    currentUser = null
    currentHospitalProducts = []
    localStorage.setItem('userSession', JSON.stringify(null))
    return HttpResponse.json({ data: null }, { status: 200 })
  }),

  // Hospital endpoint
  http.get<{ id: string }>('/api/hospital/:id', async ({ params }) => {
    const { id } = params

    if (!id) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    currentHospital = hospitals.find((c) => c.id === id) || null
    await delay(300)

    if (currentHospital) {
      return HttpResponse.json({ data: currentHospital }, { status: 200 })
    }
    return HttpResponse.json({ error: 'Hospital not found' }, { status: 404 })
  }),

  // Products endpoint
  http.get('/api/hospital/:hospitalId/products', async ({ request, params }) => {
    const { hospitalId } = params

    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '100')
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const name = url.searchParams.get('name')

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    await delay(1000)
    let results = [...currentHospitalProducts].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    if (name) {
      results = results.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
    }
    return HttpResponse.json(
      {
        data: {
          items: results.slice(offset, offset + limit),
          meta: {
            total: results.length,
            offset,
            limit,
          },
        },
      },
      { status: 200 },
    )
  }),

  // Product create
  http.post('/api/hospital/:hospitalId/products', async ({ request, params }) => {
    const { hospitalId } = params
    const { product } = await request.clone().json()

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    const schema = z.object({
      name: z.string(),
      manufacturer: z.string(),
      category: z.string(),
      quantity: z.number(),
      price: z.string(),
      expiresAt: z.iso.date().nullish(),
    })

    const validate = schema.safeParse(product)
    if (validate.success) {
      const newProduct = {
        hospitalId,
        id: generateUuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...product,
      }
      currentHospitalProducts.push(newProduct)

      await delay(300)
      return HttpResponse.json(newProduct, { status: 201 })
    }

    console.warn(validate.error)
    return HttpResponse.json({ error: 'Invalid input' }, { status: 400 })
  }),

  // Product Update
  http.put('/api/hospital/:hospitalId/products/:id', async ({ request, params }) => {
    const { hospitalId, id } = params
    const { product } = await request.clone().json()

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    const schema = z.object({
      createdAt: z.iso.datetime(),
      name: z.string(),
      manufacturer: z.string(),
      category: z.string(),
      quantity: z.number(),
      price: z.string(),
      expiresAt: z.iso.date().nullish(),
    })

    const validate = schema.safeParse(product)
    if (validate.success) {
      const updatedProduct = {
        updatedAt: new Date().toISOString(),
        ...product,
      }
      const index = currentHospitalProducts.findIndex((p) => p.id === id)
      if (index === -1) {
        return HttpResponse.json({ error: `Product with id ${id} not found` }, { status: 404 })
      }
      currentHospitalProducts[index] = updatedProduct
      await delay(300)
      return HttpResponse.json(updatedProduct, { status: 200 })
    }

    return HttpResponse.json({ error: 'Invalid input' }, { status: 400 })
  }),

  // Products remove
  http.delete('/api/hospital/:hospitalId/products', async ({ request, params }) => {
    const { hospitalId } = params
    const { ids = [] } = await request.clone().json()

    if (!hospitalId) {
      return HttpResponse.json({ error: 'hospitalId is required' }, { status: 400 })
    }

    currentHospitalProducts = currentHospitalProducts.filter((product) => !ids.includes(product.id))

    await delay(300)
    return HttpResponse.json(ids, { status: 200 })
  }),
]
