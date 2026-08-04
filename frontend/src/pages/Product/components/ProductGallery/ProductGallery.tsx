import type { ProductProps } from "../../../../props/ProductProps";
import { localUrl } from "../../../../constants/localUrl";
import styles from "./ProductGallery.module.css";



export default function ProductGallery({
    product
}: ProductProps){

    return(
        <div className={styles.imageSection}>
            <img src={`${localUrl}${product?.imageUrl}`} alt={product?.name} className={styles.image}/>
        </div>

    )
}