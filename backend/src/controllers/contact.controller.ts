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
        
        if (!fullName.trim()){
            return res.status(400).json({
                message: "Full name is empty"
            });
        }
        if (!contactNumber.trim()) {
            return res.status(400).json({
                message: "Contact number is empty"
            });
        } 
        else if (!/^09\d{9}$/.test(contactNumber)) {
            return res.status(400).json({
                message: "Invalid contact format"
            });
        } 

        if (!email.trim()) {
            return res.status(400).json({
                message: "Email is empty"
            });
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (!subject.trim()) {
           return res.status(400).json({
                message: "Subject is empty"
            }); 
        }
            
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