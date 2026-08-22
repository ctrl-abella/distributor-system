type PayMongoLineItem = {
    name: string;
    amount: number;
    quantity: number;
    currency: string;
}

type CreateCheckoutSectionParams = {
    orderId: number;
    items: PayMongoLineItem[];
    customer: {
        name: string;
        email: string;
        phone: string;
    };

}

export async function createPayMongoCheckoutSession({
    orderId,
    items,
    customer
}: CreateCheckoutSectionParams) {
    
    const secret_key = process.env.PAYMONGO_SECRET_KEY;

    if(!secret_key) {
        throw new Error("Secret key is not configured.");
    }

    const response = await fetch(
        "https://api.paymongo.com/v2/checkout_sessions",
        {
            method: "POST",

            headers: {
                "Authorization":
                    `Basic ${Buffer.from(`${secret_key}:`).toString("base64")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        line_items: items,

                        payment_method_types: [
                            "gcash",
                        ],
                        reference_number: `ORDER-${orderId}`,
                        billing: {
                            name: customer.name,
                            email: customer.email,
                            phone: customer.phone
                        },

                        send_email_receipt: false,
                        show_line_items: true,

                        success_url: `${process.env.FRONTEND_URL}/checkout/success?orderId=${orderId}`,
                        cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel?orderId=${orderId}`
                    }
                }
            })
        }
    );
    console.log(response);

    const data = await response.json();

    if(!response.ok) {
        console.error("PayMongo error: ", data);

        throw new Error(
            data?.errors?.[0]?.detail || "Failed to create PayMongo checkout session."
        );
        
    }
    return data.data;

}