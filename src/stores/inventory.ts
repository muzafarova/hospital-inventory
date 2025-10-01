import { ref } from "vue";
import { defineStore } from "pinia";

import {
  getProducts,
  deleteProducts,
  createProduct,
  updateProduct,
  type NewProductSpec,
} from "@/api/endpoints";
import Product from "@/entities/product";

import { useAuth } from "@/composables/auth";
import { useApi } from "@/composables/api";
import type ProductList from "@/collections/productList";

export const useInventoryStore = defineStore("inventory", () => {
  const productsList = ref<ProductList | null>(null);
  const productsQuery = ref<{ limit: number; offset: number; name: string }>({
    limit: 100,
    offset: 0,
    name: "",
  });
  const productsSelection = ref<string[]>([]);

  const { isLoading: loading, executeImmediate: listProducts } = useApi(
    async () =>
      useAuth(getProducts, {
        offset: productsQuery.value.offset,
        limit: productsQuery.value.limit,
        name: productsQuery.value.name,
      }),
    {
      resetOnExecute: false,
      errorMessage: "Failed to load inventory",
      onSuccess: (data: ProductList) => (productsList.value = data),
    },
  );

  const { isLoading: removing, executeImmediate: remove } = useApi(
    async (ids: string[]) => useAuth(deleteProducts, ids),
    {
      errorMessage: "Failed to remove inventory",
      onSuccess: listProducts,
    },
  );

  const { isLoading: adding, executeImmediate: addProduct } = useApi(
    async (data: NewProductSpec) => useAuth(createProduct, data),
    {
      errorMessage: "Failed to add inventory item",
      onSuccess: listProducts,
    },
  );

  const { isLoading: editing, executeImmediate: editProduct } = useApi(
    async (data: Product) => useAuth(updateProduct, data),
    {
      errorMessage: "Failed to update inventory item",
      onSuccess: listProducts,
    },
  );

  async function loadProducts({
    limit = 100,
    offset = 0,
    name = "",
  }: {
    limit?: number;
    offset?: number;
    name?: string;
  }) {
    productsQuery.value = { limit, offset, name };
    await listProducts();
  }

  async function removeProduct(id: string) {
    if (!id) {
      return;
    }
    console.log("🚚 removing inventory item", id);
    await remove([id]);
  }

  async function bulkRemoveProducts(ids: string[]) {
    if (!Array.isArray(ids)) {
      return;
    }
    console.log("🚚 mass-removing inventory", [...ids]);
    await remove(ids);
  }

  function clearProducts() {
    productsList.value = null;
  }

  function updateSelection(selected: string[]) {
    productsSelection.value = selected;
  }

  return {
    loading,
    removing,
    adding,
    editing,
    productsList,
    productsSelection,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
    bulkRemoveProducts,
    updateSelection,
    clearProducts,
  };
});
