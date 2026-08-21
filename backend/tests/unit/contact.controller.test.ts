import { describe, it, expect, vi, beforeEach } from "vitest";
import { json, type Request, type Response } from "express";

import { submitContactForm } from "../../src/controllers/contact.controller";
import { sendContactInquiry } from "../../src/services/email.service";

vi.mock("../../src/services/email.service", () => ({
    sendContactInquiry: vi.fn()
}));

describe("submitContactForm", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should send the contact inquiry and return 200", async () => {

        const req = {
            body: {
                fullName: "John Doe",
                email: "john@example.com",
                contactNumber: "09123456789",
                subject: "Product Inquiry",
                message: "I would like to know more about your product."
            }
        } as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;

        await submitContactForm(req, res);

        expect(sendContactInquiry).toHaveBeenCalledWith(
            "John Doe",
            "john@example.com",
            "09123456789",
            "Product Inquiry",
            "I would like to know more about your product."
        );
        expect(sendContactInquiry).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            message: "Email sent successfully."
        });
    });
    it("should return 500 when sendContactInquiry fails", async () => {
        vi.mocked(sendContactInquiry).mockRejectedValue(
            new Error("Email service failed")
        );

        const req = {
            body: {
                fullName: "John Doe",
                email: "john@example.com",
                contactNumber: "09123456789",
                subject: "Product Inquiry",
                message: "I would like to know more about your product."
            }
        } as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        } as unknown as Response;

        await submitContactForm(req, res);

        expect(sendContactInquiry).toHaveBeenCalledWith(
            "John Doe",
            "john@example.com",
            "09123456789",
            "Product Inquiry",
            "I would like to know more about your product."
        );
        expect(sendContactInquiry).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            message: "Failed to send email."
        });
    });
    describe("empty fields", () => {
        it("should return 400 for empty full name", async () =>{
            const req = {
                body: {
                    fullName: "",
                    email: "john@example.com",
                    contactNumber: "09123456789",
                    subject: "Product Inquiry",
                    message: "I would like to know more about your product."
                }
            } as Request;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as unknown as Response;

            await submitContactForm(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Full name is empty"
            });
            expect(sendContactInquiry).not.toHaveBeenCalled();
        });
        it("should return 400 for empty email", async () =>{
            const req = {
                body: {
                    fullName: "John Doe",
                    email: "",
                    contactNumber: "09123456789",
                    subject: "Product Inquiry",
                    message: "I would like to know more about your product."
                }
            } as Request;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as unknown as Response;

            await submitContactForm(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Email is empty"
            });
            expect(sendContactInquiry).not.toHaveBeenCalled();
        });
        it("should return 400 for empty subject", async () =>{
            const req = {
                body: {
                    fullName: "John Doe",
                    email: "john@example.com",
                    contactNumber: "09123456789",
                    subject: "",
                    message: "I would like to know more about your product."
                }
            } as Request;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as unknown as Response;

            await submitContactForm(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Subject is empty"
            });
            expect(sendContactInquiry).not.toHaveBeenCalled();
        });
        it("should return 400 for empty contact number", async () =>{
            const req = {
                body: {
                    fullName: "John Doe",
                    email: "john@example.com",
                    contactNumber: "",
                    subject: "Contact Inquiry",
                    message: "I would like to know more about your product."
                }
            } as Request;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as unknown as Response;

            await submitContactForm(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Contact number is empty"
            });
            expect(sendContactInquiry).not.toHaveBeenCalled();
        });
        });
    describe("invalid format", () => {
        it("should return 400 for invalid contact number format", async () => {
            const req = {
                body: {
                    fullName: "John Doe",
                    email: "john@example.com",
                    contactNumber: "28219919212",
                    subject: "Contact Inquiry",
                    message: "I would like to know more about your product."
                }
            } as Request;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as unknown as Response;
            
            await submitContactForm(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid contact format"
            });
            expect(sendContactInquiry).not.toHaveBeenCalled();
        });
        

        it("should return 400 for invalid email format", async () => {
            const req = {
                body: {
                    fullName: "John Doe",
                    email: "johnexample.com",
                    contactNumber: "09683211643",
                    subject: "Contact Inquiry",
                    message: "I would like to know more about your product."
                }
            } as Request;

            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            } as unknown as Response;

            await submitContactForm(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid email format"
            });

            expect(sendContactInquiry).not.toHaveBeenCalled();
        })
    });
    
});