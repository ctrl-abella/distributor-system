import { useState, useEffect } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/Product";
export function useProducts(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function loadProducts(){
            try {
                const data = await getProducts();

                setProducts(data);
            }
            catch(error){
                console.log(error);
                setError(error as Error);
            }
            finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, [])
    return {
        products,
        loading,
        error
    }
}