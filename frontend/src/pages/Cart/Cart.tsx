import styles from "./Cart.module.css";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";

import CartItem from "./components/CartItem/CartItem";
import CartSummary from "./components/CartSummary/CartSummary";



export default function Cart(){
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const navigate = useNavigate();
    const subtotal = cart.reduce(
        (sum,item)=>
            sum +
            item.product.price *
            item.quantity,
        0
    );

    return(
        <div className={styles.layout}>

        <section>

            {cart.map(item=>

                <CartItem
                    key={item.product.id}
                    item={item}
                    onIncrease={() => 
                        increaseQuantity(item.product.id)
                    }
                    onDecrease={() =>
                        decreaseQuantity(item.product.id)
                    }
                    onRemove={() => 
                        removeFromCart(item.product.id)
                    }
                />

            )}

        </section>

        <CartSummary

            subtotal={subtotal}

            shipping={0}

            total={subtotal}

            onCheckout={() => {navigate(`/checkout`)}}

        />

    </div>
        )
    }