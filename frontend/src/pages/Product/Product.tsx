import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../../types/Product";
import { getProductById, getRelatedProducts } from "../../api/products";
import { useCart } from "../../hooks/useCart";

import ProductGallery from "./components/ProductGallery/ProductGallery";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import Button from "../../components/Button/Button";
import ProductTabs from "./components/ProductTabs/ProductTabs";
import RelatedProduct from "./components/RelatedProduct/RelatedProducts";
import ProductModal from "../../components/Modal/ProductModal/ProductModal";

import styles from "./Product.module.css"
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";


export default function Product(){
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    
    const [products, setRelatedProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

    const { addToCart } = useCart();
    const { id } = useParams();

    useEffect(() => {
        async function loadData(){
            try {
                if(!id) return;
                
                const data = await getProductById(Number(id));
                const relatedProducts = await getRelatedProducts(Number(id));


                setProduct(data);
                setRelatedProducts(relatedProducts);

            } catch (error) {
                console.error(error);
            }
        }
        loadData();
    }, [id])
    
    return(
        <>
        <div className={styles.productContainer}>
            <div className={styles.productGrid}>
                
                <ProductGallery
                product={product}
                />
                <div className={styles.productDetails}>
                    <ProductInfo
                    product={product}
                    />
                    <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity(q => q + 1)}
                    onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                    />
                    <Button 
                    onClick={() => {
                        if(!product) return;

                        navigate("/checkout", {
                            state: {
                                productId: product.id,
                                quantity,
                            }
                        });
                    }}>
                        Buy Now <FaShoppingBag></FaShoppingBag>
                    </Button>
                    <Button 
                    onClick={ () => {
                        if(!product) return;
                        
                        addToCart(product, quantity);
                    }}>Add to Cart <FaShoppingCart></FaShoppingCart></Button>      
                </div>
            </div>
            <div className={styles.productInformationSection}>
                <ProductTabs
                product={product}
                />
            </div>
            <div className={styles.relatedProductsSection}>
                <header><h1>Relevant Products</h1></header>
                <RelatedProduct
                products={products}
                onOpenModal={setSelectedProduct}
                />
            </div>
        </div>
        <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        >

        </ProductModal>
        </>
        
        
        

    )
}