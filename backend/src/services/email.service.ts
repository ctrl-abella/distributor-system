import { transporter } from "../lib/email";


export async function sendContactInquiry(
    name: string,
    email: string,
    contactNumber: string,
    subject: string,
    message: string
){
    return transporter.sendMail({
        from: `"Distributor System" <${process.env.EMAIL_USER}>`,
        to: process.env.COMPANY_EMAIL,
        subject,
        html: `
            <h2>New Contact Inquiry</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contactNumber}</p>

            <p><strong>Message:</strong></p>

            <p>${message}</p>
        `,
    });
}