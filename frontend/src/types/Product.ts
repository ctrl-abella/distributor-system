import type { Category } from "./Category";
export interface Product {
    id: number;
    name: string;
    shortDescription?: string;
    fullDescription?: string;
    instruction?: string;
    benefits?: string[];
    keyBenefits?: Record<string, string>;
    price: number;
    stock: number;
    imageUrl?: string;

    category: Category;
}