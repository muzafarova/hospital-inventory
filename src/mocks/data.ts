import type { Product, InventoryConfig } from '@/types'
import type { UserJsonValue } from '@/entities/user'

import { faker } from '@faker-js/faker'

enum HospitalId {
  Hosp1 = 'hosp-001',
  Hosp2 = 'hosp-002',
}

export const users: UserJsonValue[] = [
  {
    id: faker.string.uuid(),
    username: 'admin',
    hospitalId: 'hosp-001',
    email: faker.internet.email(),
  },
  {
    id: faker.string.uuid(),
    username: 'username456',
    hospitalId: 'hosp-002',
    email: faker.internet.email(),
  },
]

export const userCredentials: Record<string, string> = {
  admin: 'password123',
  username456: faker.internet.password(),
}

export const manufacturers = [
  'Medtronic',
  'Johnson & Johnson',
  'Abbott',
  'Boston Scientific',
  'Stryker',
]

export const categories = ['Surgical', 'Diagnostic', 'Therapeutic', 'Emergency', 'Laboratory']

export const products: Product[] = Array.from({ length: 5000 }, (_, index) => ({
  hospitalId: faker.helpers.enumValue(HospitalId),
  id: faker.string.uuid(),
  name: `Product ${faker.word.noun()}`,
  price: faker.commerce.price(),
  expiresAt: faker.date.future().valueOf(),
  manufacturer: manufacturers[index % 5],
  category: categories[index % 5],
  quantity: faker.number.int({ max: 150 }),
}))

export const configs: InventoryConfig[] = [
  {
    hospitalId: 'hosp-001',
    manufacturers,
    categories,
    tableColumns: [
      ['name', 'Product Name'],
      ['manufacturer', 'Manufacturer'],
      ['category', 'Category'],
      ['quantity', 'Quantity'],
      ['price', 'Price'],
      ['expiresAt', 'Expiry Date'],
    ],
  },
  {
    hospitalId: 'hosp-002',
    manufacturers,
    categories,
    tableColumns: [
      ['name', 'Product Name'],
      ['manufacturer', 'Manufacturer'],
      ['category', 'Category'],
      ['quantity', 'Quantity'],
    ],
  },
]
