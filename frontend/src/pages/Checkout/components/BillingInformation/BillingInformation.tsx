import styles from "./BillingInformation.module.css";

import type { CheckoutFormProps } from "../../../../props/CheckoutFormProps";
import { PAYMENT_METHODS as paymentMethods } from "../../../../constants/paymentMethod";

import RadioCard from "../../../../components/RadioCard/RadioCard";

export default function BillingInformation({
    form,
    errors,
    handleChange
}: CheckoutFormProps){
    
    return(
        <div className={styles.billingInformationContainer}>
            <h2>Billing</h2>
            {paymentMethods.map((method) => {
                const Icon = method.icon;

                return (
                    <RadioCard
                        key={method.value}
                        value={method.value}
                        selected={form.paymentMethod === method.value}
                        icon={
                            typeof Icon === "string"
                                ? <img src={Icon} alt="" />
                                : <Icon />
                        }
                        title={method.title}
                        description={method.description}
                        onChange={(value) =>
                            handleChange("paymentMethod", value)
                        }
                    />
                );
            })}
            {errors.paymentMethod && (
                <span className={styles.error}>
                    {errors.paymentMethod}
                </span>
            )}
        </div>
    )
}    