import styles from "./CartModal.module.css";
import { useCart } from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";

import { FaTimes } from "react-icons/fa";
import CartItem from "../../../pages/Cart/components/CartItem/CartItem";
import Button from "../../Button/Button";

type CartModalProp = {
    onClose: () => void;
}

export default function CartModal({
    onClose
}: CartModalProp){

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const isCartEmpty = cart.length === 0;


    return(
        <>
            <div
            className={styles.backdrop}
            />
            <div className={styles.modal}>
                <button
                    className={styles["closeButton"]}
                    onClick={onClose}
                >
                    <FaTimes></FaTimes>
                </button>
                <div className={styles.content}>
                    
                    {cart.map(item => 
                        <CartItem
                        item={item}
                        onIncrease={
                            () => increaseQuantity(item.product.id)
                        }
                        onDecrease={
                            () => decreaseQuantity(item.product.id)
                        }
                        onRemove={
                            () => removeFromCart(item.product.id)
                        }
                        />
                    )}
                    
                    
                </div>
                <Button
                    onClick={() => {
                    onClose()
                    navigate("/checkout")
                    }   
                }
                    disabled={isCartEmpty}
                    >Checkout
                </Button>
            </div>
        </>
    )
}