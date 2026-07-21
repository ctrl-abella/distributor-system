import prisma from "../lib/prisma"
import type { Request, Response } from "express";


export async function getProducts(
    req: Request, 
    res: Response
) {
    try {
        const products = await prisma.product.findMany({
        include: {
            category: true
        }
    });
    res.status(200).json(products);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch products.",
        });
    }
}
