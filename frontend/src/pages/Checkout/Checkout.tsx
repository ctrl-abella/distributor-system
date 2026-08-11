import { useCart } from "../../hooks/useCart";
import { useState } from "react";

import styles from "./Checkout.module.css";

import OrderSummary from "./components/OrderSummary/OrderSummary";
import CustomerInformation from "./components/CustomerInformation/CustomerInformation";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import BillingInformation from "./components/BillingInformation/BillingInformation";

import type { CheckoutForm } from "../../types/CheckoutForm";
import type { CheckoutErrors } from "../../types/CheckoutErrors";

export default function Checkout(){ 
    
    const { cart, subtotal } = useCart();

    const [form, setForm] = useState<CheckoutForm>({
        fullName: "",
        contactNumber: "",
        email: "",
    
        region: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",
    
        paymentMethod: "",
    });
    const [errors, setErrors] =  useState<CheckoutErrors>({
        fullName: "",
        contactNumber: "",
        email: "",

        region: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",

        paymentMethod: "",
    });
    const handleChange = (
        field: keyof CheckoutForm,
        value: string
    ) => {
        setForm(prev => ({
            ...prev,
            [field]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [field]: "",
        }));
    };

    return(
        <div className={styles.checkOutContainer}>  
            <OrderSummary
                cart={cart}
                subtotal={subtotal}
                >    
            </OrderSummary>
            <CustomerInformation
                form={form}
                errors={errors}
                handleChange={handleChange}
            />
            <ShippingAddress
                form={form}
                errors={errors}
                handleChange={handleChange}
            />
            <BillingInformation
            form={form}
            errors={errors}
            handleChange={handleChange}
            />
            
        </div>
    )
}