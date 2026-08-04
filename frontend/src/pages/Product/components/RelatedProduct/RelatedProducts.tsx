import { useNavigate } from "react-router-dom";
import styles from "./RelatedProduct.module.css";
import ShopProductCard from "../../../../components/Cards/ShopProductCard/ShopProductCard";
import type { Product } from "../../../../types/Product";


type RelatedProductProps = { 
    products: Product[],
    onOpenModal: (product: Product) => void;
}
export default function RelatedProducts({
    products,
    onOpenModal
}: RelatedProductProps){
    const navigate = useNavigate();
    
    return(
        <div className={styles.relatedProductsSection}>
            {products?.map((product) => (
                <ShopProductCard
                    product={product}
                    onClick={() => navigate(`/products/${product.id}`)}
                    onAddToCart={() => onOpenModal(product)}
                />
            ))}
        </div>
    )
}