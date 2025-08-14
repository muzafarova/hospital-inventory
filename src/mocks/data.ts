import type { User, Product } from '@/types'

export const users: User[] = [
  {
    username: 'admin',
    hospitalId: 'hosp-001',
  },
  {
    username: 'user-two',
    hospitalId: 'hosp-002',
  },
]

export const userCredentials: Record<string, string> = {
  admin: 'password-one',
  'user-two': 'password-two',
}

// Mock products data
// TODO use faker
export const mockProducts: Product[] = Array.from({ length: 5000 }, (_, index) => ({
  id: `prod-${index + 1}`,
  name: `Product ${index + 1}`,
  manufacturer: ['Medtronic', 'Johnson & Johnson', 'Abbott', 'Boston Scientific', 'Stryker'][
    index % 5
  ],
  category: ['Surgical', 'Diagnostic', 'Therapeutic', 'Emergency', 'Laboratory'][index % 5],
  quantity: Math.floor(Math.random() * 100) + 1,
}))
