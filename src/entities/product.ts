import * as z from 'zod'

export type ProductJsonValue = {
  id: string
  hospitalId: string
  name: string
  manufacturer: string
  category: string
  quantity: number
  price: string
  expiresAt: number
}

export default class Product {
  static readonly schema = z.object({
    id: z.uuid(),
    hospitalId: z.string(),
    name: z.string(),
    manufacturer: z.string(),
    category: z.string(),
    quantity: z.number(),
    price: z.string(),
    expiresAt: z.number(),
  })

  constructor(
    readonly id: string,
    readonly hospitalId: string,
    readonly name: string,
    readonly manufacturer: string,
    readonly category: string,
    readonly quantity: number,
    readonly price: string,
    readonly expiresAt: number,
  ) {}

  static validate(data: ProductJsonValue) {
    this.schema.parse(data)
  }

  static fromJson(data: ProductJsonValue) {
    Product.validate(data)
    return new Product(
      data.id,
      data.hospitalId,
      data.name,
      data.manufacturer,
      data.category,
      data.quantity,
      data.price,
      data.expiresAt,
    )
  }
}
