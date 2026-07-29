import { useState, type ReactNode } from "react";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import  { CartContext } from "../context/CartContext";


type Props = {
    children: ReactNode;
};

export function CartProvider({
    children,
}: Props) {

    const [cart, setCart] =
        useState<CartItem[]>([]);

    function addToCart(
        product: Product,
        quantity: number
    ) {

        setCart(previous => {

            const existing =
                previous.find(
                    item =>
                        item.product.id === product.id
                );

            if (existing) {

                return previous.map(item =>

                    item.product.id === product.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity +
                                  quantity,
                          }
                        : item
                );
            }

            return [
                ...previous,
                {
                    product,
                    quantity,
                },
            ];
        });
    }

    function removeFromCart(
        productId: number
    ) {

        setCart(previous =>
            previous.filter(
                item =>
                    item.product.id !== productId
            )
        );
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}