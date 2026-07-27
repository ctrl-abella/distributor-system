import { apiFetch } from "./client";
import type { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {
    return apiFetch("/products");
}