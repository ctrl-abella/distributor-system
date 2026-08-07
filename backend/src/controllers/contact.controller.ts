import type { Request, Response } from "express";
import { sendContactInquiry } from "../services/email.service";
export async function submitContactForm(
    req: Request,
    res: Response
) {
    try {
        const {
            fullName,
            email,
            contactNumber,
            subject,
            message
        } = req.body;

        await sendContactInquiry(
            fullName,
            email,
            contactNumber,
            subject,
            message
        );

        res.status(200).json({
            message: "Email sent successfully."
        });


    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to send email."
        })
    }
    
}