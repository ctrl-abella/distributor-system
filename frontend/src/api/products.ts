import { apiFetch } from "./client";
import type { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {
    return apiFetch("/products");
}
export async function getProductById(id: number): Promise<Product> {
    return apiFetch(`/products/${id}`);
}
export async function getRelatedProducts(id: number): Promise<Product[]> {
    return apiFetch(`/products/${id}/related`);
}