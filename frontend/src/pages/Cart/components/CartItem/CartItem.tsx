import styles from "./CartItem.module.css";
import { FaTrash } from "react-icons/fa";
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

                <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />

            </div>

            <button

                className={styles.remove}

                onClick={onRemove}

            >

                <FaTrash/>

            </button>

        </div>

    );
}