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
    const subtotal = cart.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    )

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
    function increaseQuantity(productId: number) {
        setCart(previous =>
            previous.map(item =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(productId: number) {
        setCart(previous =>
            previous.map(item =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity - 1),
                    }
                    : item
            )
        );
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                subtotal,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
}