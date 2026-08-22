import { Link, useSearchParams } from "react-router-dom";
import {
    FaCheckCircle,
    FaShoppingBag,
    FaArrowRight,
} from "react-icons/fa";
import styles from "./PaymentResult.module.css";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <main className={styles.paymentResultPage}>
            <section className={styles.paymentResultCard}>
                <div
                    className={`${styles.paymentResultIcon} ${styles.successIcon}`}
                >
                    <FaCheckCircle />
                </div>

                <h1>Thank you for your order!</h1>

                <p className={styles.paymentResultDescription}>
                    Your GCash payment has been successfully received.
                    Your order is now being processed.
                </p>

                {orderId && (
                    <div className={styles.orderReference}>
                        <span>Order Number</span>
                        <strong>#{orderId}</strong>
                    </div>
                )}

                <p className={styles.paymentResultNote}>
                    A confirmation email will be sent to the email address
                    provided during checkout.
                </p>

                <div className={styles.paymentResultActions}>
                    <Link
                        to="/shop"
                        className={styles.primaryPaymentButton}
                    >
                        <FaShoppingBag />
                        Continue Shopping
                    </Link>

                    <Link
                        to="/"
                        className={styles.secondaryPaymentButton}
                    >
                        Back to Home
                        <FaArrowRight />
                    </Link>
                </div>
            </section>
        </main>
    );
}