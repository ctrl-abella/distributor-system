import styles from "../Home/Home.module.css";
import Button from "../../components/Button/Button.tsx";
import FeaturedProductCard from "../../components/Cards/FeaturedProductCard/FeaturedProductCard.tsx";
import type { Product } from "../../types/Product.ts";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/products.ts";
import ProductModal from "../../components/ProductModal/ProductModal.tsx";


export default function Home(){
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

    useEffect(() => {
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
        <div className={styles.titleSection}>
            <h1>Your Gateway to Holistic Wellness</h1>
            <p>At Intra Health Essentials Philippines, we are dedicated to helping you achieve a healthier, more vibrant lifestyle through the trusted power of Lifestyles products</p>
        </div>
        <Button variant="primary">Shop Now &#128722;</Button>
        <div className={styles.featuredProductsSection}>
            <h1>Featured Products</h1>
            <p>Your Daily Dose of Wellness, Exclusively from Intra Health Essentials Philippines</p>
            <div className={styles["featured-products-container"]}>
                {products.map((product) => (
                    <FeaturedProductCard
                        key={product.id}
                        product={product}
                        onClick={setSelectedProduct}
                    />
                ))}
            </div>
        </div>
        <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
        />

        </>
        
    );
}