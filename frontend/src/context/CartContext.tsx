import {
    createContext,
} from "react";

import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

type CartContextType = {
    cart: CartItem[];

    addToCart: (
        product: Product,
        quantity: number
    ) => void;

    removeFromCart: (
        productId: number
    ) => void;
};

export const CartContext =
    createContext<CartContextType | null>(null);

