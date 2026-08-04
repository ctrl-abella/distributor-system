import styles from "./ShopProductCard.module.css";
import type { Product } from "../../../types/Product";
import { localUrl } from "../../../constants/localUrl";
import { FaHeart, FaPlus } from "react-icons/fa";

import Button from "../../Button/Button";

type ShopProductCardProps = {
    product: Product,
    onClick: () => void,
    onAddToCart: () => void
}
export default function ShopProductCard({
    product,
    onClick,
    onAddToCart
}: ShopProductCardProps){

    return(
        <>
            <div 
            className={styles["shop-product-card"]}
            onClick={onClick}
            >
                <div className={styles["product-image-container"]}>
                    <span><FaHeart className={styles.favoriteIcon}/></span>
                    <img src={`${localUrl}${product.imageUrl}`} alt={product.name} />
                </div>
                <div className={styles.productInformation}>
                    <h2>{product.name}</h2> 
                    <p>{product.category.name}</p>
                    <h4>₱{product.price}</h4>
                </div>
                <div className={styles.actionButton}>
                    <Button
                        className={styles.cartButton}
                        onClick={ (e) => {
                            e.stopPropagation();
                            onAddToCart();
                        }}
                    ><FaPlus></FaPlus></Button>
                </div>
                

            </div>
        </>
    )
}