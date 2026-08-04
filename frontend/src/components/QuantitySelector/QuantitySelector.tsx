import styles from "./QuantitySelector.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";

type QuantitySelectorProp = {
    quantity: number,
    onIncrease: () => void,
    onDecrease: () => void
}

export default function QuantitySelector({ 
    quantity,
    onIncrease,
    onDecrease
 }: QuantitySelectorProp){
    return(
        <div className={styles.quantity}>
            <button
                onClick={onDecrease}
            >
                <FaMinus />
            </button>

            <span>{quantity}</span>

            <button
                 onClick={onIncrease}
            >
                <FaPlus />
            </button>
        </div>
    )
}