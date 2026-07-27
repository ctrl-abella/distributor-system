import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL
    })
});

async function main(){
    const categoryName = "Capsule";

    const category = await prisma.category.findUnique({
        where: {
            name: categoryName,
        },
    });
    if(!category){
        throw new Error(`${categoryName} category not found.`);
    }

    await prisma.product.create({
        data: {
            sku: "INH02",
            name: "Intra (Capsule)",
            description: "Intra is a premium botanical food supplement formulated with a unique blend of 23 botanical extracts, designed to support and enhance your overall well-being.",
            benefits: [
                "Boosts Immunity",
                "Supports Overall Wellness",
                "Combats Stress and Toxins"
            ],
            price: 1880,
            imageUrl: "/uploads/products/Intra Capsule.png",
            categoryId: category.id,
        },
    });
}
main()

