import { useState } from "react";

import styles from "./Contact.module.css";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";



export default function Contact(){
    const [form, setForm] = useState({
        fullName: "",
        contactNumber: "",
        email: "",
        subject: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        fullName: "",
        contactNumber: "",
        email: "",
        subject: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setForm(prev => ({
            ...prev,
            [field]: e.target.value
        }));

       
        if (field in errors) {
            setErrors(prev => ({
                ...prev,
                [field]: "",
            }));
        }
    };
    const handleSubmit = async () => {
        
        if(isSubmitting) return;

        const newErrors = {
            fullName: "",
            contactNumber: "",
            email: "",
            subject: ""
        };

        if (!form.fullName.trim())
            newErrors.fullName = "Full name is required.";

        if (!form.contactNumber.trim()) {
            newErrors.contactNumber = "Contact number is required.";
        } 
        else if (!/^09\d{9}$/.test(form.contactNumber)) {
            newErrors.contactNumber =
                "Enter a valid 11-digit mobile number.";
        } else if (form.contactNumber.length !== 11) {
            newErrors.contactNumber =
                "Contact number must be exactly 11 digits.";
        } else if (!form.contactNumber.startsWith("09")) {
            newErrors.contactNumber =
                "Contact number must start with 09.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!form.subject.trim())
            newErrors.subject = "Subject is required.";

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors)
            .some(error => error !== "");

        if (hasErrors) return;

        setIsSubmitting(true);
        
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/contact`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.message);
            }
            alert("Inquiry Submitted!");
            setForm({
                fullName: "",
                contactNumber: "",
                email: "",
                subject: "",
                message: ""
            });

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Something went wrong.");
            }
        }
        finally {

            setIsSubmitting(false);
        }

        
    };
    return(
        <>
        <div className={styles.pageIntroduction}>
            <h1>Have any Questions?</h1>
            <p>Intra Health Essentials Philippines is here to help you. Contact our customer service team regarding orders, shipping, and product-related queries.</p>
        </div>
        <div className={styles.contactForm}>
            <TextField 
            label="Full Name"
            name="fullName"
            inputMode="text"
            value={form.fullName}
            error={errors.fullName}
            onChange={handleChange("fullName")}
            placeholder="Enter Full Name"
            />
            <TextField
            label="Contact Number"
            name="contactNumber"
            type="tel"
            inputMode="numeric"
            value={form.contactNumber}
            error={errors.contactNumber}
            onChange={handleChange("contactNumber")}
            placeholder="e.g 09278191232"
            />
            <TextField
            label="Email"
            name="email"
            inputMode="text"
            value={form.email}
            error={errors.email}
            onChange={handleChange("email")}
            placeholder="example@domain.com"
            />
            <TextField
            label="Subject"
            name="subject"
            inputMode="text"
            value={form.subject}
            error={errors.subject}
            onChange={handleChange("subject")}
            />
            <TextArea
                label="Message (Optional)"
                name="message"
                value={form.message}
                placeholder="Type your message..."
                onChange={handleChange("message")}
            />
            <div className={styles.submitContainer}>
                <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                >{isSubmitting ? "Submitting..." : "Submit"}</Button>
            </div>
            
        </div>
        </>
        
    );
}