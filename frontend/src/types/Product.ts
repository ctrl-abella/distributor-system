import type { Category } from "./Category";
export interface Product {
    id: number;
    name: string;
    description?: string;
    benefits?: string[];
    price: number;
    stock: number;
    imageUrl?: string;

    category: Category;
}