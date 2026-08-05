import styles from "./OrderSummary.module.css";
import OrderSummaryItem from "../OrderSummaryItem/OrderSummaryItem";
import type { CartItem } from "../../../../types/CartItem";

type OrderSummaryProps = {
    cart: CartItem[],
    subtotal: number
}

export default function OrderSummary({
    cart,
    subtotal
}: OrderSummaryProps){
    const total = subtotal;
    return(
        <div className={styles.orderSummary}>
            {cart.map(item => (
                <OrderSummaryItem
                    item={item}
                />

            ))}
            <div className={styles.subtotalContainer}>
                <p>Subtotal</p>
                <p>₱{subtotal}</p>
            </div>
            <div className={styles.totalContainer}>
                <p>Total</p>
                <p>₱{total}</p>
            </div>
        </div>
    )
}