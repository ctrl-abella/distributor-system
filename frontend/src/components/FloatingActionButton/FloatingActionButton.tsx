import styles from "./FloatingActionButton.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";

type FloatingActionButtonProp = {
    onClick: () => void;
}

export default function FloatingActionButton({
    onClick
}: FloatingActionButtonProp) {
    const { cart } = useCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0 
    );
    const badgeText = totalItems > 99 ? "99+" : totalItems;
    return(
        <button
            className={styles["fab"]}
            aria-label="Open Cart"
            onClick={onClick}
        >
            <FaShoppingCart/>
            {totalItems > 0 && (
                <span className={styles.badge}>
                    {badgeText}
                </span>
            )}
        </button>
    )
}