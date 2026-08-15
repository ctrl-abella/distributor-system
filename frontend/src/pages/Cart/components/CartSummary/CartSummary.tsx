import { useCart } from "../../../../hooks/useCart";
import styles from "./CartSummary.module.css";
import Button from "../../../../components/Button/Button";

type Props = {
    subtotal:number;
    total:number;
    onCheckout:() => void;
};

export default function CartSummary({
    subtotal,
    total,
    onCheckout,
}:Props){
    const { cart } = useCart();

    const isCartEmpty = cart.length === 0;
    return(

        <aside className={styles.summary}>

            <h2>
                Order Summary
            </h2>

            <div className={styles.row}>

                <span>Subtotal</span>

                <span>₱{subtotal}</span>

            </div>

            <hr/>

            <div className={styles.total}>

                <span>Total</span>

                <span>₱{total}</span>

            </div>

            <Button
            onClick={onCheckout}
            disabled={isCartEmpty}
            >
                Proceed to Checkout
            </Button>
        </aside>
    );
}