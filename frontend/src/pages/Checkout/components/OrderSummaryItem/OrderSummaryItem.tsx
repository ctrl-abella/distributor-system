import styles from "./OrderSummaryItem.module.css";
import { localUrl } from "../../../../constants/localUrl";
import type { CartItem } from "../../../../types/CartItem";

type Props = {
    item: CartItem
}
export default function OrderSummaryItem({
    item
}: Props){

    return(
        <div className={styles.orderSummaryItemContainer}>
            <div className={styles.imageContainer}>
                <span className={styles.quantityBadge}>
                    {item.quantity}
                </span>
                <img src={`${localUrl}${item.product?.imageUrl}`} alt={item.product?.name} />
            </div>
            <div className={styles.productInfo}>
                <h4>{item.product?.name}</h4>
                <p>{item.product?.category.name}</p>
            </div>
            <div className={styles.price}>
                ₱{item.product?.price}
            </div>
        </div>
    )
}