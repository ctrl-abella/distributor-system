import styles from "./CartSummary.module.css";
import Button from "../../../../components/Button/Button";

type Props = {

    subtotal:number;

    shipping:number;

    total:number;

    onCheckout:() => void;

};

export default function CartSummary({
    subtotal,
    shipping,
    total,
    onCheckout,
}:Props){

    return(

        <aside className={styles.summary}>

            <h2>
                Order Summary
            </h2>

            <div className={styles.row}>

                <span>Subtotal</span>

                <span>₱{subtotal}</span>

            </div>

            <div className={styles.row}>

                <span>Shipping</span>

                <span>

                    {shipping === 0
                        ? "FREE"
                        : `₱${shipping}`}

                </span>

            </div>

            <hr/>

            <div className={styles.total}>

                <span>Total</span>

                <span>₱{total}</span>

            </div>

            <Button
            onClick={onCheckout}
            >
                Proceed to Checkout
            </Button>

        </aside>

    );
}