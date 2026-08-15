import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import { sendOrderNotification } from "../services/email.service";

type OrderItemInput = {
    productId: number;
    quantity: number;
};

type OrderRequest = {
    customer: {
        fullName: string;
        contactNumber: string;
        email: string;
    };
    shipping: {
        region: string;
        province: string;
        city: string;
        address: string;
        postalCode: string;
    };
    paymentMethod: string;
    items: OrderItemInput[];
};

export async function createOrder(
    req: Request,
    res: Response
) {
    try {
        const {
            customer,
            shipping,
            paymentMethod,
            items,
        }: OrderRequest = req.body;

        if (!customer || !shipping || !paymentMethod || !items) {
            return res.status(400).json({
                message: "Missing required order information.",
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one item.",
            });
        }

        const productIds = items.map(
            item => item.productId
        );

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
                isActive: true,
            },
        });

        // ----------------------------------------
        // Make sure every product exists
        // ----------------------------------------

        if (products.length !== productIds.length) {
            return res.status(400).json({
                message: "One or more products are unavailable.",
            });
        }

        // ----------------------------------------
        // Calculate order items
        // ----------------------------------------

        const orderItems: {
            productId: number;
            quantity: number;
            unitPrice: number;
            subtotal: number;
        }[] = [];

        let subtotal = 0;

        for (const item of items) {
            const product = products.find(
                product => product.id === item.productId
            );

            if (!product) {
                return res.status(400).json({
                    message: `Product ${item.productId} not found.`,
                });
            }

            if (
                !Number.isInteger(item.quantity) ||
                item.quantity <= 0
            ) {
                return res.status(400).json({
                    message: "Invalid product quantity.",
                });
            }

            const unitPrice = Number(product.price);
            const itemSubtotal = unitPrice * item.quantity;

            subtotal += itemSubtotal;

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                unitPrice: unitPrice,
                subtotal: itemSubtotal,
            });
        }

        const shippingFee = 0;
        const totalAmount = subtotal + shippingFee;

        const order = await prisma.order.create({
            data: {
                fullName: customer.fullName,
                contactNumber: customer.contactNumber,
                email: customer.email,

                address: shipping.address,
                city: shipping.city,
                province: shipping.province,
                postalCode: shipping.postalCode,

                paymentMethod,

                subtotal,
                shippingFee,
                totalAmount,

                items: {
                    create: orderItems,
                },
            },

            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        try {
            await sendOrderNotification({
                orderId: order.id,

                customerName: order.fullName,
                customerEmail: order.email,
                contactNumber: order.contactNumber,

                address: order.address,
                city: order.city,
                province: order.province,
                postalCode: order.postalCode,

                paymentMethod: order.paymentMethod,

                subtotal: order.subtotal.toString(),
                shippingFee: order.shippingFee.toString(),
                totalAmount: order.totalAmount.toString(),

                items: order.items.map(item => ({
                    productName: item.product.name,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice.toString(),
                    subtotal: item.subtotal.toString(),
                })),
            })
        } catch (emailError) {
            console.error("Order created but owner notification failed: ", emailError);
        }

        // ----------------------------------------
        // Success
        // ----------------------------------------

        return res.status(201).json({
            message: "Order placed successfully.",
            order,
        });

    } catch (error) {

        console.error("Create order error:", error);

        return res.status(500).json({
            message: "Failed to create order.",
        });
    }
}