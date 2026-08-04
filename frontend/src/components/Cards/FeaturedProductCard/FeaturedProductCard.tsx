import type { Product } from "../../../types/Product";
import styles from "../FeaturedProductCard/FeaturedProductCard.module.css";
import Button from "../../Button/Button";
import { localUrl } from "../../../constants/localUrl";
import { useNavigate } from "react-router-dom";




type Props = {
    product: Product,
    onClick: (product: Product) => void;
};


export default function FeaturedProductCard({
    product,
    onClick,
}: Props){
    const navigate = useNavigate();
    return(
        <div 
        className={styles["featured-product-card"]}
        onClick={() => onClick(product)}
        >
            <div className={styles["product-image-container"]}>
                <img src={`${localUrl}${product.imageUrl}`} alt={product.name} />
            </div>
            <h2>{product.name}</h2>
            <p>{product.shortDescription}</p>
            <div className={styles["action-buttons"]}>
                <Button 
                variant="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/${product.id}`);
                }
                }>
                  <span className={styles["button-text"]}>Order Now</span>
                </Button>
            </div>
        </div>
    )
}