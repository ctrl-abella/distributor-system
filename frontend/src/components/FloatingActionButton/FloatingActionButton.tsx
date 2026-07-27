import styles from "./FloatingActionButton.module.css";
import { FaShoppingCart } from "react-icons/fa";


export default function FloatingActionButton() {
    return(
        <button
            className={styles["fab"]}
            aria-label="Open Cart"
        >
            <FaShoppingCart/>
        </button>
    )
}