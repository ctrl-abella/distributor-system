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
export async function getProductById(
    req: Request,
    res: Response
){
    try {
        const id = Number(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({
                message: "Invalid Product ID."
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: true,
            },
        })
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch product."
        })
    }
}

export async function getRelatedProducts(
    req: Request,
    res: Response
){
    try {
        const id = Number(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({
                message: "Invalid Product ID."
            });
        }
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
            });
        }
        const relatedProducts = await prisma.product.findMany({
            where: {
                categoryId: product.categoryId,
                id: {
                    not: product.id
                },
            },
            include : {
                category: true
            }
        });
        return res.status(200).json(relatedProducts);
    }
    catch(error){   
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch related products"
        });
    }
}
