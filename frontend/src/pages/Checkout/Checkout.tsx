import { useCart } from "../../hooks/useCart";
import { useState } from "react";

import styles from "./Checkout.module.css";

import Button from "../../components/Button/Button";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import CustomerInformation from "./components/CustomerInformation/CustomerInformation";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import BillingInformation from "./components/BillingInformation/BillingInformation";

import type { CheckoutForm } from "../../types/CheckoutForm";
import type { CheckoutErrors } from "../../types/CheckoutErrors";

export default function Checkout(){ 
    
    const { cart, subtotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    const handleSubmit = async () => {
        console.log("HANDLE SUBMIT CALLED");
        if(isSubmitting) return;

        const newErrors = {
            fullName: "",
            contactNumber: "",
            email: "",

            region: "",
            province: "",
            city: "",
            address: "",
            postalCode: "",

            paymentMethod: "",
        };

        if(!form.fullName.trim()) {
            newErrors.fullName = "Full name is required.";
        }
        if(!form.contactNumber.trim()){
            newErrors.contactNumber = "Contact number is required";
        }
        else if (!/^09\d{9}$/.test(form.contactNumber)) {
            newErrors.contactNumber =
                "Enter a valid 11-digit mobile number.";
        } else if (form.contactNumber.length !== 11) {
            newErrors.contactNumber =
                "Contact number must be exactly 11 digits.";
        } else if (!form.contactNumber.startsWith("09")) {
            newErrors.contactNumber =
                "Contact number must start with 09.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Enter a valid email address.";
        }

        if(!form.region.trim()){
            newErrors.region = "Please select a region.";
        }
        if(!form.province.trim()){
            newErrors.province = "Please select a province.";
        }
        if(!form.city.trim()){
            newErrors.city = "Please select a city.";
        }
        if(!form.address.trim()){
            newErrors.address = "Please fill this field.";
        }
        if(!form.postalCode.trim()){
            newErrors.postalCode = "Please fill this field.";
        }

        if(!form.paymentMethod.trim()){
            newErrors.paymentMethod = "Please select a payment method."
        }
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors)
            .some(error => error !== "");

        if(hasErrors) return;

        setIsSubmitting(true);
        try {
            const respone = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customer: {
                            fullName: form.fullName,
                            contactNumber: form.contactNumber,
                            email: form.email,
                        },
                        shipping: {
                            region: form.region,
                            province: form.province,
                            city: form.city,
                            address: form.address,
                            postalCode: form.postalCode
                        },
                        paymentMethod: form.paymentMethod,
                        items: cart.map(item => ({
                            productId: item.product.id,
                            quantity: item.quantity
                        })),
                    }),
                }
            );

            const data = await respone.json();

            if(!respone.ok){
                throw new Error(
                    data.message || "Failed to place order"
                );
            }
            console.log("Order created: ", data.order);
            alert("Order placed successfully!");
            
            clearCart();



        } catch (error) {
            console.error("Checkout error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while placing your order."
            );
        }
        finally {
            setIsSubmitting(false);
        }

    }


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
            <div className={styles.actionButtonContainer}>
                <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
            </div>
            
            
        </div>
    )
}