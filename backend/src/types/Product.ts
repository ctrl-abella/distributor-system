export interface Product {
    id: number;
    sku: string;
    name: string;
    descripion?: string;
    price: number;
    stock: number;
    imageUrl?: string;
}