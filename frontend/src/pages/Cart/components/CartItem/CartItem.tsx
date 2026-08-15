import styles from "./CartItem.module.css";
import { FaTimes } from "react-icons/fa";
import QuantitySelector from "../../../../components/QuantitySelector/QuantitySelector";
import { localUrl } from "../../../../constants/localUrl";

import type { CartItem as CartItemType } from "../../../../types/CartItem";

type Props = {
    item: CartItemType;

    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
};

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,

}: Props){

    return(

        <div className={styles.card}>
            <button
                className={styles.remove}
                onClick={onRemove}
            >
                <FaTimes/>

            </button>
            

            <img
                src={`${localUrl}${item.product.imageUrl}`}
                alt={item.product.name}
            />

            <div className={styles.info}>

                <h3>{item.product.name}</h3>

                <p>{item.product.category.name}</p>

                <span>

                    ₱{item.product.price.toLocaleString()}

                </span>

            </div>
            <div className={styles.quantity}>
                <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            </div>

            

        </div>

    );
}