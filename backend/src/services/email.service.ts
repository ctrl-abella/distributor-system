import { resend } from "../lib/resend";

export async function sendContactInquiry(
    name: string,
    email: string,
    contactNumber: string,
    subject: string,
    message: string
) {
    try {
        const result = await resend.emails.send({
            from: "Lifestyles Distributor <onboarding@resend.dev>",
            to: process.env.COMPANY_EMAIL!,
            subject,
            html: `
                <h2>New Contact Inquiry</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contact Number:</strong> ${contactNumber}</p>

                <p><strong>Message:</strong></p>

                <p>${message || "No message provided."}</p>
            `,
        });

        return result;

    } catch (error) {
        console.error("Failed to send contact inquiry:", error);
        throw new Error("Unable to send contact inquiry.");
    }
}

type OrderEmailItem = {
    productName: string;
    quantity: number;
    unitPrice: string;
    subtotal: string;
};


export type OrderEmailData = {
    orderId: number;
    customerName: string;
    customerEmail: string;
    contactNumber: string;

    address: string;
    city: string;
    province: string;
    postalCode: string;

    paymentMethod: string;

    subtotal: string;
    shippingFee: string;
    totalAmount: string;

    items: OrderEmailItem[];
};

export async function sendOrderNotification(
    order: OrderEmailData
) {
    const itemsHtml = order.items
        .map(
            item => `
                <tr>
                    <td style="padding: 8px 0;">
                        ${item.productName}
                    </td>
                    <td style="padding: 8px 0;">
                        ${item.quantity}
                    </td>
                    <td style="padding: 8px 0;">
                        ₱${item.unitPrice}
                    </td>
                    <td style="padding: 8px 0;">
                        ₱${item.subtotal}
                    </td>
                </tr>
            `
        )
        .join("");

    await resend.emails.send({
        from: "Lifestyles Distributor <onboarding@resend.dev>",
        to: process.env.COMPANY_EMAIL!,
        subject: `New Order #${order.orderId} - ${order.customerName}`,

        html: `
            <h2>New Order Received</h2>

            <p>
                A new order has been placed and requires your review.
            </p>

            <hr />

            <h3>Order #${order.orderId}</h3>

            <h3>Customer Information</h3>

            <p>
                <strong>Name:</strong> ${order.customerName}<br />
                <strong>Email:</strong> ${order.customerEmail}<br />
                <strong>Contact:</strong> ${order.contactNumber}
            </p>

            <h3>Shipping Address</h3>

            <p>
                <strong>Address:</strong>${order.address}<br />
                <strong>City/Region:</strong>${order.city}, ${order.province}<br />
                <strong>Postal Code:</strong>${order.postalCode}
            </p>

            <h3>Order Items</h3>

            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="text-align: left;">Product</th>
                        <th style="text-align: left;">Qty</th>
                        <th style="text-align: left;">Price</th>
                        <th style="text-align: left;">Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>

            <hr />

            <p>
                <strong>Subtotal:</strong>
                ₱${order.subtotal}
            </p>

            <p>
                <strong>Shipping:</strong>
                ₱${order.shippingFee}
            </p>

            <h3>
                Total: ₱${order.totalAmount}
            </h3>

            <p>
                <strong>Payment Method:</strong>
                ${order.paymentMethod}
            </p>

            <hr />

            <p>
                Please review and manually approve this order.
            </p>
        `,
    });
}