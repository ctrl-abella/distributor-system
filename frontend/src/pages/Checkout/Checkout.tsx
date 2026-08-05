import { useCart } from "../../hooks/useCart";

import styles from "./Checkout.module.css";
import OrderSummary from "./components/OrderSummary/OrderSummary";
export default function Checkout(){
    
    const { cart, subtotal } = useCart();

    return(
        <div className={styles.checkOutContainer}>  
            <OrderSummary
                cart={cart}
                subtotal={subtotal}
                >
                
                </OrderSummary>
        </div>
    )
}