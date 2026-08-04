import type { ProductProps } from "../../../../props/ProductProps";
import styles from "./ProductInfo.module.css";
export default function ProductInfo({
    product
}: ProductProps){
    return(
        <div className={styles.productInfo}>
            <h1>{product?.name}</h1>
            <p>{product?.category.name}</p>
            <h2>₱{product?.price}</h2>
            <p>{product?.shortDescription}</p>
        </div>
    )
}