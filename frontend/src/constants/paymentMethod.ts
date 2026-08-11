import type { ComponentType } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import gcash_logo from "../assets/images/gcash_logo.png";


export type PaymentMethod = {
    value: string;
    title: string;
    description: string;
    icon: ComponentType | string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        value: "GCASH",
        title: "GCash",
        description: "Pay using your GCash wallet",
        icon: gcash_logo,
    },
    {
        value: "COD",
        title: "Cash on Delivery",
        description: "Pay when your order arrives",
        icon: FaMoneyBillWave,
    },
];