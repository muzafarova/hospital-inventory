import * as z from "zod";

export type ProductJsonValue = {
  id: string;
  code: string;
  hospitalId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  manufacturer: string;
  category: string;
  quantity: number;
  price: string;
};

export default class Product {
  static readonly schema = z.object({
    id: z.uuid(),
    code: z.string(),
    hospitalId: z.string(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    name: z.string(),
    manufacturer: z.string(),
    category: z.string(),
    quantity: z.number(),
    price: z.string(),
  });

  constructor(
    readonly id: string,
    readonly code: string,
    readonly hospitalId: string,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly name: string,
    readonly manufacturer: string,
    readonly category: string,
    readonly quantity: number,
    readonly price: string,
  ) {}

  static validate(data: ProductJsonValue) {
    this.schema.parse(data);
  }

  static fromJson(data: ProductJsonValue) {
    Product.validate(data);
    return new Product(
      data.id,
      data.code,
      data.hospitalId,
      data.createdAt,
      data.updatedAt,
      data.name,
      data.manufacturer,
      data.category,
      data.quantity,
      data.price,
    );
  }
}
