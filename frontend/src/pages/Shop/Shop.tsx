import { useState, useEffect } from "react";
import { getProducts } from "../../api/products";
import type { Product } from "../../types/Product";
import ShopProductCard from "../../components/Cards/ShopProductCard/ShopProductCard";
import ProductModal from "../../components/ProductModal/ProductModal";
import styles from "./Shop.module.css";

export default function Shop(){
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);


    useEffect( () => {
        async function loadProducts(){
            try {
                const data = await getProducts();
                console.log(data);
                setProducts(data);

            }
            catch(error){
                console.error(error);
            }
        }
        loadProducts();
    }, []);
    return(
        <>
           <div className={styles.productsSection}>
                {products.map((product) => (
                <ShopProductCard
                onClick={setSelectedProduct}
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