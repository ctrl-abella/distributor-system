import { describe, it, expect, vi, beforeEach } from "vitest";
import { json, type Request, type Response } from "express";

import { createOrder } from "../../src/controllers/order.controller";
import { sendOrderNotification } from "../../src/services/email.service";
import { PaymentMethod } from "../../src/generated/prisma/enums";
import prisma from "../../src/lib/prisma";

import { Prisma } from "../../src/generated/prisma/client";

vi.mock("../../src/lib/prisma", () => ({
    default: {
        product: {
            findMany: vi.fn(),
        },
        order: {
            create: vi.fn(),
            update: vi.fn(),
        },
    },
}));

vi.mock("../../src/services/email.service", () => ({
    sendOrderNotification: vi.fn(),
}));

vi.mock("../../src/services/paymongo.service", () => ({
    createPayMongoCheckoutSession: vi.fn(),
}));

function createMockResponse() {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
    } as unknown as Response;
}

function createValidRequest(
    overrides: Partial<any> = {}
) {
    return {
        body: {
            customer: {
                fullName: "John Doe",
                contactNumber: "09123456789",
                email: "john@example.com",
            },

            shipping: {
                region: "Region XI",
                province: "Davao de Oro",
                city: "Tagum",
                address: "123 Main Street",
                postalCode: "8100",
            },

            paymentMethod: PaymentMethod.COD,

            items: [
                {
                    productId: 1,
                    quantity: 2,
                },
            ],

            ...overrides,
        },
    } as Request;
}
describe("createOrder", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    it("should create a COD order and return 201", async () => {
        const req = createValidRequest();

        const res = createMockResponse();

        vi.mocked(prisma.product.findMany).mockResolvedValue([
            {
                id: 1,
                name: "CardioLife",
                price: 100,
                isActive: true,
            }
        ] as any);
        vi.mocked(prisma.order.create).mockResolvedValue({
            id: 123,
            fullName: "John Doe",
            contactNumber: "09683211643",
            email: "john@example",
            address: "123 Main Street",
            city: "Tagum",
            province: "Davao de Oro",
            postalCode: "8100",
            paymentMethod: PaymentMethod.COD,
            subtotal: 200,
            shippingFee: 0,
            totalAmount: 200,

            items: [
                {
                    productId: 1,
                    quantity: 2,
                    unitPrice: 100,
                    subtotal: 200,
                    product: {
                        id: 1,
                        name: "CardioLife",
                        price: 100,
                    },
                },
            ],
        } as any);

        await createOrder(req, res);

        expect(prisma.product.findMany).toHaveBeenCalled();

        expect(prisma.order.create).toHaveBeenCalled();

        expect(sendOrderNotification).toHaveBeenCalledTimes(1);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Order placed successfully.",
                order: expect.anything()
            })
        );
    });
    describe("validations", () => {
        it("should return 400 when required order information is missing", async () => {
            const req = {
                body: {}
            } as Request;

            const res = createMockResponse(); 

            await createOrder(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: "Missing required order information."
            });

            expect(prisma.product.findMany).not.toHaveBeenCalled();
        });
    })

});