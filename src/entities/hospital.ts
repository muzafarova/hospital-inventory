import * as z from 'zod'
import Product from './product'

export type HospitalJsonValue = {
  id: string
  name: string
  spec: HospitalSpec
}

type HospitalSpec = {
  manufacturers: string[]
  categories: string[]
  tableColumns: [keyof Product, string][]
}

export default class Hospital {
  static schema = z.object({
    id: z.enum(['hosp-001', 'hosp-002']),
    name: z.string(),
    spec: z.object({
      manufacturers: z.array(z.string()),
      categories: z.array(z.string()),
      tableColumns: z.array(
        z.tuple([
          z.enum([
            'hospitalId',
            'name',
            'manufacturer',
            'category',
            'quantity',
            'price',
            'expiresAt',
          ]),
          z.string(),
        ]),
      ),
    }),
  })

  constructor(
    readonly id: string,
    readonly name: string,
    readonly spec: HospitalSpec,
  ) {}

  static validate(data: HospitalJsonValue) {
    Hospital.schema.parse(data)
  }

  static fromJson(data: HospitalJsonValue) {
    Hospital.validate(data)
    return new Hospital(data.id, data.name, data.spec)
  }
}
