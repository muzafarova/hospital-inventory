import * as z from "zod";

import Product, { type ProductJsonValue } from "@/entities/product";

type Meta = {
  total: number;
  limit: number;
  offset: number;
};

export type ProductListJsonValue = {
  items: ProductJsonValue[];
  meta: Meta;
};

export default class ProductList {
  static schema = z.object({
    items: z.array(Product.schema),
    meta: z.object({
      total: z.int().gte(0),
      offset: z.int().gte(0),
      limit: z.int().gt(0),
    }),
  });

  constructor(
    readonly items: Product[],
    readonly meta: Meta,
  ) {}

  static validate(list: ProductListJsonValue) {
    ProductList.schema.parse(list);
  }

  static fromJson(list: ProductListJsonValue) {
    ProductList.validate(list);
    return new ProductList(list.items, list.meta);
  }
}
