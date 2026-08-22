import { Link, useSearchParams } from "react-router-dom";
import {
    FaTimesCircle,
    FaRedo,
    FaHome,
} from "react-icons/fa";
import styles from "./PaymentResult.module.css";

export default function PaymentCancelled() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <main className={styles.paymentResultPage}>
            <section className={styles.paymentResultCard}>
                <div
                    className={`${styles.paymentResultIcon} ${styles.cancelledIcon}`}
                >
                    <FaTimesCircle />
                </div>

                <h1>Your payment was not completed</h1>

                <p className={styles.paymentResultDescription}>
                    The GCash payment process was cancelled or was not
                    completed. Your order has not been marked as paid.
                </p>

                {orderId && (
                    <div className={styles.orderReference}>
                        <span>Order Number</span>
                        <strong>#{orderId}</strong>
                    </div>
                )}

                <p className={styles.paymentResultNote}>
                    You can return to checkout and try the payment again.
                </p>

                <div className={styles.paymentResultActions}>
                    <Link
                        to="/checkout"
                        className={styles.primaryPaymentButton}
                    >
                        <FaRedo />
                        Try Again
                    </Link>

                    <Link
                        to="/"
                        className={styles.secondaryPaymentButton}
                    >
                        <FaHome />
                        Back to Home
                    </Link>
                </div>
            </section>
        </main>
    );
}