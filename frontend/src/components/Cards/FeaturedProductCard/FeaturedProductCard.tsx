import type { Product } from "../../../types/Product";
import styles from "../FeaturedProductCard/FeaturedProductCard.module.css";
import Button from "../../Button/Button";



type Props = {
    product: Product
};


export default function ProductCard({
    product,
}: Props){
    
    return(
        <div className={styles["featured-product-card"]}>
            <div className={styles["product-image-container"]}>
                <img src={`http://localhost:3000${product.imageUrl}`} alt={product.name} />
            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className={styles["action-buttons"]}>
                <Button variant="primary">
                  <span className={styles["button-text"]}>Order Now</span>
                </Button>
            </div>
        </div>
    )
}