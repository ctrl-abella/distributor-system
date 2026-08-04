import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import ShopProductCard from "../../components/Cards/ShopProductCard/ShopProductCard";
import ProductModal from "../../components/ProductModal/ProductModal";
import styles from "./Shop.module.css";
import { useProducts } from "../../hooks/useProducts";

export default function Shop(){
    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);
    const navigate = useNavigate();
    const { products, loading, error } = useProducts();
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>Something went wrong</p>

    return(
        <>
           <div className={styles.productsSection}>
                {products.map((product) => (
                <ShopProductCard
                onClick={() => navigate(`/products/${product.id}`)}
                onAddToCart={() => setSelectedProduct(product)}
                product={product}
                key={product.id}
                />
           ))}
           </div>
           <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
           />
        </>
    );
}