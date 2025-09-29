import User, { type UserJsonValue } from "@/entities/user";
import Hospital, { type HospitalJsonValue } from "@/entities/hospital";
import Product from "@/entities/product";
import ProductList, { type ProductListJsonValue } from "@/collections/productList";

import { request } from "./request";

// Auth
export async function loginUser({ username, password }: { username: string; password: string }) {
  return await request<UserJsonValue, User>("/api/auth/login", User.fromJson, {
    method: "POST",
    data: { username, password },
  });
}

export async function logoutUser() {
  return await request(`/api/auth/logout`, () => null, { method: "POST" });
}

export async function checkSession() {
  return await request<UserJsonValue, User>("/api/auth/session", User.fromJson);
}

export async function getHospital(hospitalId: string) {
  return await request<HospitalJsonValue, Hospital>(
    `/api/hospital/${hospitalId}`,
    Hospital.fromJson,
    {
      query: { hospitalId },
    },
  );
}

export async function getProducts(
  hospitalId: string,
  query: { limit: number; offset: number; name: string },
) {
  return await request<ProductListJsonValue, ProductList>(
    `/api/hospital/${hospitalId}/products`,
    ProductList.fromJson,
    {
      query,
    },
  );
}

export type NewProductSpec = Omit<
  Product,
  "hospitalId" | "id" | "code" | "createdAt" | "updatedAt"
>;

export async function createProduct(hospitalId: string, newProduct: NewProductSpec) {
  return await request(`/api/hospital/${hospitalId}/products`, () => null, {
    method: "POST",
    data: { product: newProduct },
  });
}

export async function updateProduct(hospitalId: string, product: Product) {
  return await request(`/api/hospital/${hospitalId}/products/${product.id}`, () => null, {
    method: "PUT",
    data: { product },
  });
}

export async function deleteProducts(hospitalId: string, ids: string[]) {
  return await request(`/api/hospital/${hospitalId}/products`, () => null, {
    method: "DELETE",
    data: { ids },
  });
}
