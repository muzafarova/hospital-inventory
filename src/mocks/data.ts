import type { UserJsonValue } from '@/entities/user'
import type { ProductJsonValue } from '@/entities/product'
import type { HospitalJsonValue } from '@/entities/hospital'

import { faker } from '@faker-js/faker'

enum HospitalId {
  Hosp1 = 'hosp-001',
  Hosp2 = 'hosp-002',
}

const admin = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}
const username456 = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}

export const users: UserJsonValue[] = [
  {
    id: faker.string.uuid(),
    username: 'admin',
    hospitalId: 'hosp-001',
    email: faker.internet.email(admin),
    name: faker.person.fullName(admin),
  },
  {
    id: faker.string.uuid(),
    username: 'username456',
    hospitalId: 'hosp-002',
    email: faker.internet.email(username456),
    name: faker.person.fullName(username456),
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

export const products: ProductJsonValue[] = Array.from({ length: 5000 }, (_, index) => ({
  hospitalId: faker.helpers.enumValue(HospitalId),
  id: faker.string.uuid(),
  name: `Product ${faker.word.noun()}`,
  price: faker.commerce.price(),
  expiresAt: faker.date.future().toISOString().split('T')[0],
  manufacturer: manufacturers[index % 5],
  category: categories[index % 5],
  quantity: faker.number.int({ max: 150 }),
}))

export const hospitals: HospitalJsonValue[] = [
  {
    id: 'hosp-001',
    name: 'St. Gabriel Medical Center',
    spec: {
      manufacturers,
      categories,
      tableColumns: [
        ['name', 'Product Name'],
        ['manufacturer', 'Manufacturer'],
        ['category', 'Category'],
        ['quantity', 'Quantity'],
        ['price', 'Price'],
        ['expiresAt', 'Expiry Date'],
      ] as [string, string][],
    },
  },
  {
    id: 'hosp-002',
    name: 'Riverside General Hospital',
    spec: {
      manufacturers,
      categories,
      tableColumns: [
        ['name', 'Product Name'],
        ['manufacturer', 'Manufacturer'],
        ['category', 'Category'],
        ['quantity', 'Quantity'],
      ] as [string, string][],
    },
  },
]
