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
            from: "Distributor Demo <onboarding@resend.dev>",
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