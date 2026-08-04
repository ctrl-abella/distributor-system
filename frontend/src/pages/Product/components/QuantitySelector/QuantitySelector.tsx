import styles from "./QuantitySelector.module.css";
import type { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

type QuantitySelectorProp = {
    quantity: number,
    setQuantity: Dispatch<SetStateAction<number>>
}

export default function QuantitySelector({ 
    quantity,
    setQuantity
 }: QuantitySelectorProp){
    return(
        <div className={styles.quantity}>
            <button
                onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                }
            >
                <FaMinus />
            </button>

            <span>{quantity}</span>

            <button
                 onClick={() => setQuantity((q) => q + 1)}
            >
                <FaPlus />
            </button>
        </div>
    )
}