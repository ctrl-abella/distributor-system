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
    ) as {
        t?: string;
        te?: string;
        li?: string;
    };

    if (!parts.t || (!parts.te && !parts.li)) {
        return false;
    }

    const signedPayload = `${parts.t}.${rawBody}`;

    const expected = crypto
        .createHmac("sha256", secret)
        .update(signedPayload)
        .digest("hex");

    // Keep your existing signature selection logic.
    const providedSignature = parts.te ?? parts.li ?? "";

    const expectedBuf = Buffer.from(expected, "utf8");
    const providedBuf = Buffer.from(providedSignature, "utf8");

    if (expectedBuf.length !== providedBuf.length) {
        return false;
    }

    return crypto.timingSafeEqual(
        expectedBuf,
        providedBuf
    );
}

export async function handlePayMongoWebhook(
    req: Request,
    res: Response
) {
    console.log("WEBHOOK HIT");

    try {
        // ----------------------------------------
        // Get webhook secret
        // ----------------------------------------

        const webhookSecret =
            process.env.PAYMONGO_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error(
                "PAYMONGO_WEBHOOK_SECRET is not configured."
            );

            return res.status(500).json({
                message: "Webhook secret is not configured.",
            });
        }

        // ----------------------------------------
        // Verify RAW request body
        // ----------------------------------------

        const rawBody = req.body as Buffer;

        const signatureHeader =
            req.header("Paymongo-Signature");

        const isValid = verifyPayMongoSignature(
            rawBody.toString("utf8"),
            signatureHeader,
            webhookSecret
        );

        if (!isValid) {
            console.error(
                "Invalid PayMongo webhook signature."
            );

            return res.status(400).json({
                message: "Invalid signature.",
            });
        }

        // ----------------------------------------
        // Parse event
        // ----------------------------------------

        const event = JSON.parse(
            rawBody.toString("utf8")
        );

        console.log(
            "PayMongo webhook received:",
            JSON.stringify(event, null, 2)
        );

        const eventType =
            event?.data?.attributes?.type;

        console.log(
            "PayMongo event type:",
            eventType
        );

        // ----------------------------------------
        // Only process successful payments
        // ----------------------------------------

        if (
            eventType !==
            "checkout_session.payment.paid"
        ) {
            console.log(
                `Ignoring unhandled event type: ${eventType}`
            );

            return res.status(200).json({
                received: true,
            });
        }

        // ----------------------------------------
        // Get checkout session
        // ----------------------------------------

        const checkoutSession =
            event?.data?.attributes?.data;

        if (!checkoutSession?.id) {
            console.error(
                "Webhook does not contain checkout session ID."
            );

            return res.status(400).json({
                message:
                    "Missing checkout session ID.",
            });
        }

        const checkoutSessionId =
            checkoutSession.id;

        // ----------------------------------------
        // Find Payment
        // ----------------------------------------
        //
        // IMPORTANT:
        // We now find the payment using the
        // PayMongo checkout session ID.
        //
        // Payment belongs to Order, so we include
        // the related Order and OrderItems.
        // ----------------------------------------

        const payment =
            await prisma.payment.findUnique({
                where: {
                    paymongoCheckoutSessionId:
                        checkoutSessionId,
                },

                include: {
                    order: {
                        include: {
                            items: {
                                include: {
                                    product: true,
                                },
                            },
                        },
                    },
                },
            });

        if (!payment) {
            console.error(
                "No payment found for PayMongo checkout session:",
                checkoutSessionId
            );

            return res.status(404).json({
                message: "Payment not found.",
            });
        }

        const order = payment.order;

        // ----------------------------------------
        // Idempotency
        // ----------------------------------------
        //
        // PayMongo can send the webhook more than
        // once, so don't process an already-paid
        // payment again.
        // ----------------------------------------

        if (
            payment.status === PaymentStatus.PAID
        ) {
            console.log(
                `Payment #${payment.id} is already PAID.`
            );

            return res.status(200).json({
                received: true,
            });
        }

        // ----------------------------------------
        // Update Payment
        // ----------------------------------------

        const updatedPayment =
            await prisma.payment.update({
                where: {
                    id: payment.id,
                },

                data: {
                    status: PaymentStatus.PAID,
                },
            });

        console.log(
            `Payment #${updatedPayment.id} marked as PAID.`
        );

        // ----------------------------------------
        // Send notification
        // ----------------------------------------

        try {
            await sendOrderNotification({
                orderId: order.id,

                customerName:
                    order.fullName,

                customerEmail:
                    order.email,

                contactNumber:
                    order.contactNumber,

                address:
                    order.address,

                city:
                    order.city,

                province:
                    order.province,

                postalCode:
                    order.postalCode,

                paymentMethod:
                    payment.method.toString(),

                subtotal:
                    order.subtotal.toString(),

                shippingFee:
                    order.shippingFee.toString(),

                totalAmount:
                    order.totalAmount.toString(),

                items:
                    order.items.map(item => ({
                        productName:
                            item.product.name,

                        quantity:
                            item.quantity,

                        unitPrice:
                            item.unitPrice.toString(),

                        subtotal:
                            item.subtotal.toString(),
                    })),
            });

            console.log(
                `Owner notification sent for Order #${order.id}.`
            );

        } catch (emailError) {
            console.error(
                "Payment succeeded but owner notification failed:",
                emailError
            );
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
            message:
                "Webhook processing failed.",
        });
    }
}