import type { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../lib/prisma";
import { PaymentStatus } from "../generated/prisma/enums";
import { sendOrderNotification } from "../services/email.service";

// ----------------------------------------
// Signature verification
// ----------------------------------------
// PayMongo signs every webhook with a "Paymongo-Signature" header formatted as:
//   t=<timestamp>,te=<test_mode_signature>,li=<live_mode_signature>
// You must verify against the RAW request body (before JSON parsing) or the
// computed HMAC will never match. See payment.route.ts for the raw-body setup
// this function depends on.
function verifyPayMongoSignature(
    rawBody: string,
    signatureHeader: string | undefined,
    secret: string
): boolean {
    if (!signatureHeader) return false;

    const parts = Object.fromEntries(
        signatureHeader.split(",").map(pair => pair.split("="))
    ) as { t?: string; te?: string; li?: string };

    if (!parts.t || (!parts.te && !parts.li)) return false;

    const signedPayload = `${parts.t}.${rawBody}`;
    const expected = crypto
        .createHmac("sha256", secret)
        .update(signedPayload)
        .digest("hex");

    // Use "li" instead of "te" once you're verifying live-mode webhooks.
    const providedSignature = parts.te ?? parts.li ?? "";

    // timing-safe comparison
    const expectedBuf = Buffer.from(expected, "utf8");
    const providedBuf = Buffer.from(providedSignature, "utf8");

    if (expectedBuf.length !== providedBuf.length) return false;

    return crypto.timingSafeEqual(expectedBuf, providedBuf);
}

export async function handlePayMongoWebhook(
    req: Request,
    res: Response
) {
    console.log("WEBHOOK HIT");
    try {
        const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("PAYMONGO_WEBHOOK_SECRET is not configured.");
            return res.status(500).json({
                message: "Webhook secret is not configured.",
            });
        }

        // req.body is a Buffer here because payment.route.ts uses express.raw()
        // for this route. Verify BEFORE parsing to JSON.
        const rawBody = req.body as Buffer;
        const signatureHeader = req.header("Paymongo-Signature");

        const isValid = verifyPayMongoSignature(
            rawBody.toString("utf8"),
            signatureHeader,
            webhookSecret
        );

        if (!isValid) {
            console.error("Invalid PayMongo webhook signature.");
            return res.status(400).json({
                message: "Invalid signature.",
            });
        }

        const event = JSON.parse(rawBody.toString("utf8"));

        console.log(
            "PayMongo webhook received:",
            JSON.stringify(event, null, 2)
        );

        const eventType = event?.data?.attributes?.type;

        console.log("PayMongo event type:", eventType);

        // Only act on the event we actually care about. Without this check,
        // ANY event referencing this checkout session (including failures)
        // would fall through and get marked PAID below.
        if (eventType !== "checkout_session.payment.paid") {
            console.log(`Ignoring unhandled event type: ${eventType}`);
            return res.status(200).json({ received: true });
        }

        const checkoutSession = event?.data?.attributes?.data;

        if (!checkoutSession?.id) {
            console.error("Webhook does not contain checkout session ID.");

            return res.status(400).json({
                message: "Missing checkout session ID.",
            });
        }

        const checkoutSessionId = checkoutSession.id;

        const order = await prisma.order.findFirst({
            where: {
                paymongoCheckoutSessionId: checkoutSessionId
            },

            include: {
                items: {
                    include: {
                        product: true
                    },
                },
            },

        });

        if (!order) {
            console.error("No order found for Paymongo checkout session:", checkoutSessionId);

            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.paymentStatus === PaymentStatus.PAID) {
            console.log(`Order #${order.id} is already marked PAID.`);

            return res.status(200).json({
                received: true
            });
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: order.id
            },

            data: {
                paymentStatus: PaymentStatus.PAID,
                
            },

            include: {
                items: {
                    include: {
                        product: true
                    },
                },
            },

        });

        console.log(
            `Order #${updatedOrder.id} payment marked as PAID.`
        );

        try {
            await sendOrderNotification({
                orderId: updatedOrder.id,

                customerName: updatedOrder.fullName,
                customerEmail: updatedOrder.email,
                contactNumber: updatedOrder.contactNumber,

                address: updatedOrder.address,
                city: updatedOrder.city,
                province: updatedOrder.province,
                postalCode: updatedOrder.postalCode,
                paymentMethod: updatedOrder.paymentMethod,

                subtotal: updatedOrder.subtotal.toString(),
                shippingFee: updatedOrder.shippingFee.toString(),
                totalAmount: updatedOrder.totalAmount.toString(),

                items: updatedOrder.items.map(item => ({
                    productName: item.product.name,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice.toString(),
                    subtotal: item.subtotal.toString()
                })),

            });
            console.log(
                `Owner notification sent for Order #${updatedOrder.id}.`
            );
        }
        catch (emailError) {
            console.error("Payment succeeded but owner notification failed:", emailError);
        }

        return res.status(200).json({
            received: true,
        });


    } catch (error) {
        console.error(
            "PayMongo webhook error:",
            error
        );

        return res.status(500).json({
            message: "Webhook processing failed.",
        });
    }
}